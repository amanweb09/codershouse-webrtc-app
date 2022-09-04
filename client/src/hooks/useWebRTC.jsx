// import { useState } from "react"
import { useCallback, useEffect, useRef } from "react"
import { useStateWithCallback } from "./useStateWithCallback"
import { socketInit } from '../socket'
import { ACTIONS } from "../actions"
import freeice from 'freeice'

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback([])
    const audioElements = useRef({ /* userId: audio_player_instance */ })
    const connections = useRef({ /* socketId: connection */ })
    const localMediaStream = useRef(null)
    const socket = useRef(null)

    useEffect(() => {
        socket.current = socketInit()
    }, [])

    function provideRef(instance, userId) {
        audioElements.current[userId] = instance
    }

    const addNewClient = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => { return client._id === newClient._id })

        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb)
        }

    }, [clients, setClients])

    useEffect(() => {

        const handleNewPeer = async ({
            peerId,
            createOffer,
            user: remoteUser
        }) => {
            /* If already connected */
            if (peerId in connections.current) {
                return console.warn("you're already connected with ", peerId, user.name)
            }

            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice()
            })

            /* handle new ice candidate */
            connections.current[peerId].onicecandidate = (event) => {
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate
                })
            }

            connections.current[peerId].ontrack = ({
                streams: [remoteStream]
            }) => {
                addNewClient(remoteUser, () => {
                    if (audioElements.current[remoteUser._id]) {
                        audioElements.current[remoteUser._id].srcObject = remoteStream
                    }
                    else {
                        let settled = false
                        const interval = setInterval(() => {
                            if (audioElements.current[remoteUser._id]) {
                                audioElements.current[remoteUser._id].srcObject = remoteStream
                                settled = true
                            }
                            if (settled) {
                                clearInterval(interval)
                            }
                        }, 1000)
                    }
                })
            }

            /* add local track to remote connections */
            localMediaStream.current.getTracks().forEach((track) => {
                connections.current[peerId].addTrack(
                    track,
                    localMediaStream.current
                )
            })

            if (createOffer) {
                const offer = await connections.current[peerId].createOffer()

                await connections.current[peerId].setLocalDescription(offer)

                /* send offer another client */
                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: offer
                })
            }
        }

        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer)

        return () => {
            socket.current.off(ACTIONS.ADD_PEER)
        }
    }, [])

    /* capture media */
    useEffect(() => {
        async function startCapture() {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true
            })
        }
        startCapture().then(() => {
            addNewClient(user, () => {
                const localElement = audioElements.current[user.id]
                if (localElement) {
                    localElement.volume = 0
                    localElement.srcObject = localMediaStream.current
                }

                //connect to ws
                socket.current.emit(ACTIONS.JOIN, { roomId, user })
            })
        })

        return () => {
            /* Leaving the room */

            if (!localMediaStream.current) { return }
            localMediaStream.current.getTracks().forEach((track) => track.stop())
            socket.current.emit(ACTIONS.LEAVE, { roomId })

        }
    }, [])

    /* Handle ice candidate */
    useEffect(() => {
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
            if (icecandidate) {
                connections.current[peerId].addIceCandidate(icecandidate)
            }
        })

        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE)
        }
    }, [])

    /* Handle SDP */
    useEffect(() => {
        socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp)

        function handleRemoteSdp({ peerId, sessionDescription: remoteSessionDescription }) {
            connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteSessionDescription)
            )

            /* if session desc is type of offer create an answer */
            if (remoteSessionDescription.type === 'offer') {
                const connection = connections.current[peerId]
                const answer = connection.createAnswer()

                connection.setLocalDescription(answer)

                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: answer
                })
            }
            else { return }
        }

        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION)
        }
    }, [])

    /* handle remove peer */
    useEffect(() => {

        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer)

        async function handleRemovePeer({ peerId, userId }) {
            if (connections.current[peerId]) {
                connections.current[peerId].close()
            }

            delete connections.current[peerId]
            delete audioElements.current[peerId]

            setClients((list) => { list.filter((client) => { return client !== userId }) })
        }

        return () => {
            socket.current.off(ACTIONS.REMOVE_PEER)

        }
    }, [])



    return { clients, provideRef }
}