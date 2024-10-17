import gamesModel from "../models/gamesModel.js";

async function getGame(req) {
    let games = await gamesModel.find();
    return games;
}

async function getGameByName(name) {
    try {
        let nameGame = await gamesModel.find({name: name});
        return nameGame;
    } catch (error) {
        console.log("Juego no encontrando", error);
    }
}

async function getGamesByGenre(genre) {
    try {
        const games = await gamesModel.find({
            genre: { $regex: new RegExp(genre, "i") } 
        });
        if (games.length === 0) {
            throw new Error("No se encontraron juegos para este género");
        }
        return games;
    } catch (error) {
        throw new Error(error.message);
    }
}


async function createGame(body) { 
    let newGame = new gamesModel({
        name: body.name,      
        genre: body.genre,
        description: body.description,
        developer: body.developer,
        release_date: body.release_date,
        platform: body.platform,
        cover: body.cover
    });
    return await newGame.save();
}


async function updateGame(id, body) {
    let updateGame = await gamesModel.findByIdAndUpdate(id,{
        $set:{
                name: body.name,
                genre: body.genre,
                description: body.description,
                developer: body.developer,
                release_date: body.release_date,
                platform: body.platform,
                cover: body.cover
        }
    });
    return updateGame;
}


async function deleteGame(id, res) {
    try {
        const gameDeleted = await gamesModel.findByIdAndDelete(id)
        
        if (!gameDeleted) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }

        return res.status(200).json({
            message: "Juego eliminado con éxito",
            game: gameDeleted
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el juego",
            error: error.message
        });
    }
};

export {getGame, getGamesByGenre, getGameByName, createGame, updateGame, deleteGame};