import { ObjectId } from "mongoose";

//Defining the type of todo elements
export interface TodoType {
    _id: ObjectId,
    title: string,
    description: string, 
    priority: string,
    isChecked: boolean,
    isEditing: boolean,
    date: string
  }

