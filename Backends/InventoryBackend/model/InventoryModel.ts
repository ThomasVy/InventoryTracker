import { Schema, Types, model } from "mongoose";
import { z } from "zod";
import { UserId } from "../types/user";

const inventoryEntitySchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  userId: z.string().min(1),
  tag: z.string().refine(s => !s.includes(' '), 'No Spaces Allowed in tag'),
  name: z.string().min(1),
  stock: z.number().nonnegative(),
  cost: z.number().nonnegative(),
  type: z.string().min(1),
  reference: z.string(),
  owner: z.string(),
  imageLink: z.string().default("http://localhost:4000/images/no-image-icon.png"),
})
const partialEntitySchema = inventoryEntitySchema.omit({ userId: true, _id: true }).partial();
const inventoryDTOSchema = inventoryEntitySchema.omit({_id: true, userId: true}).merge(z.object({id: z.string()}));
const inventoryDTOMiniSchema = inventoryDTOSchema.pick({id: true, tag: true, name: true});
export type InventoryEntity = z.infer<typeof inventoryEntitySchema>;
export type InventoryDTO = z.infer<typeof inventoryDTOSchema>;
export type InventoryDTOMini = z.infer<typeof inventoryDTOMiniSchema>;

export const InventoryEntity = {
  convertToEntity({id, ...dto}: InventoryDTO, userId: UserId) {
    const candidate : InventoryEntity = {
        _id: new Types.ObjectId(id),
        ...dto,
        userId
    }
    return inventoryEntitySchema.parse(candidate);
  },
  convertToPartialEntity(dto: Omit<Partial<InventoryDTO>, "userId" | "id">) {
    return partialEntitySchema.parse(dto);
  },
  convertKey(id: string, userId: string) {
    return {
      _id: new Types.ObjectId(id),
      userId
    }
  }
}

export const InventoryDTO = {
  convertToDTO({_id, ...entity}: InventoryEntity): InventoryDTO {
      const candidate : InventoryDTO = {
        id: _id.toHexString(),
        ...entity
      }
      return inventoryDTOSchema.parse(candidate);
  },
  convertToMiniDTO({_id, tag, name}: InventoryEntity): InventoryDTOMini {
    const candidate : InventoryDTOMini = {
      id: _id.toHexString(),
      tag,
      name
    };
    return inventoryDTOMiniSchema.parse(candidate);
  }
}

const inventorySchema = new Schema<InventoryEntity>({
  userId: String,
  tag: String,
  name: String,
  stock: Number,
  cost: Number,
  type: {
    type: String
  },
  reference: String,
  owner: String,
  imageLink: String
});

inventorySchema.index({'tag': 1, 'userId': 1}, {unique: true});
export const Inventory = model("Inventory", inventorySchema);
