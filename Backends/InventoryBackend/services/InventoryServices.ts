import { Inventory, InventoryDTO, InventoryEntity } from '../model/InventoryModel';
import { StatusError } from '../types/error';
import { UserId } from "../types/user";

async function createInventoryItem(dto: InventoryDTO, userId: UserId) {
    const candidate = InventoryEntity.convertToEntity(dto, userId);
    try {
        const inventoryItem = (await Inventory.create(candidate)).toObject();
        return InventoryDTO.convertToDTO(inventoryItem);
    } catch(error) {
        throw new StatusError(`Tag ${candidate.tag} is in use`, {statusCode: 400});
    }
}

async function deleteInventoryItem(id: string, userId: UserId) {
    const key = InventoryEntity.convertKey(id, userId);
    await Inventory.deleteOne(key);
}

async function getInventoryItem(id: string, userId: string) {
    const key = InventoryEntity.convertKey(id, userId);
    const item = (await Inventory.findOne(key))?.toObject();
    if (!item)
        throw new StatusError("Item didn't exist", { statusCode: 204 });
    return InventoryDTO.convertToDTO(item);
}

async function getInventoryItemByTag(tag: string, userId: string) {
    const item = (await Inventory.findOne({tag, userId}))?.toObject();
    if (!item)
        throw new StatusError("Item didn't exist", { statusCode: 204 });
    return InventoryDTO.convertToDTO(item);
}

async function updateInventoryItem(id: string, dto: Partial<InventoryDTO>, userId: string) {
    const key = InventoryEntity.convertKey(id, userId);
    const candidate = InventoryEntity.convertToPartialEntity(dto);
    try {
        const updatedInventory = (await Inventory.findOneAndUpdate(
            key,
            { $set: candidate },
            { returnDocument: "after" }))?.toObject();
        if (!updatedInventory)
            throw new StatusError(`No order with id ${id} exists`, { statusCode: 404 });
        return InventoryDTO.convertToDTO(updatedInventory);
    } catch(error) {
        throw new StatusError(`There's already an item with tag ${candidate.tag}`, {statusCode: 400});
    }
}

async function getNumberOfInventoryItem(userId: string, search: string) {
    return await Inventory.countDocuments({
        userId,
        "$or": [{
            name: {
                $regex: search,
                $options: "i"
            }
        }, {
            tag: {
                $regex: search,
                $options: "i"
            }
        }]
    });
}

async function getInventory(userId: string, search: string, limit?: number, skip?: number) {
    const query = Inventory.find({
        userId,
        "$or": [{
            tag: {
                $regex: search,
                $options: "i"
            }
        }, {
            name: {
                $regex: search,
                $options: "i"
            }
        }]
    });
    
    if (skip != null) {
        query.skip(skip);
    }
    if (limit != null) {
        query.limit(limit);
    }
    const inventoryItems = await query;
    const inventoryDTO = inventoryItems.map((item) => {
        return InventoryDTO.convertToMiniDTO(item);
    });
    return inventoryDTO;
}

export default {
    createInventoryItem,
    deleteInventoryItem,
    getInventoryItem,
    updateInventoryItem,
    getNumberOfInventoryItem,
    getInventory,
    getInventoryItemByTag
};