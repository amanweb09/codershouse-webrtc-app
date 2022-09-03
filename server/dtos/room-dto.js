class RoomDto {

    constructor(room) {
        this.id = room._id;
        this.topic = room.topic;
        this.roomType = room.roomType;
        this.speakers = room.speakers;
        this.ownerId = room.ownerId;
        this.createdAt = room.createdAt;
    }

}

module.exports = RoomDto