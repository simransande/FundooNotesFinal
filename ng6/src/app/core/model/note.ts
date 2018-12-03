export interface Note{
tittle:	string;
description:string;
email:string;
reminder:string;
pin:string;
archive:string;
trash:string;
colorcode:string;
image:string;
DragAndDropID:string;
}

export interface Collaborator{
id:string;
noteId:string;
email:string;
sharedEmail:string;
}

export interface Label{
id:string;
email:string;
label:string;
}