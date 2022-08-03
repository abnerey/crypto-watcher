import type { DroppableStateSnapshot } from "react-beautiful-dnd";

export const getBackgroundColor = (snapshot: DroppableStateSnapshot) => {
    // When this property is not empty this is the dragging source
    // Using the same color for reording and marking it as the source
    if (snapshot.draggingFromThisWith) return 'lightcyan';
    // When this property is true show this as the target
    if (snapshot.isDraggingOver) return 'palegreen';
    // No dragging is happening
    return 'white';
}