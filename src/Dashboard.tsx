import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";

const columns = ["To Do", "Progress", "Done"];

interface Subtask {
  id: number;
  title: string;
}

interface Task {
  id: number;
  title: string;
  status: string;
  subtasks: Subtask[];
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");

  const addTask = () => {
    if (!taskTitle.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: taskTitle, status: "To Do", subtasks: [] },
    ]);
    setTaskTitle("");
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addSubtask = (taskId: number, subtaskTitle: string) => {
    if (!subtaskTitle.trim()) return;
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          subtasks: [
            ...task.subtasks,
            { id: Date.now(), title: subtaskTitle },
          ],
        };
      })
    );
  };

  const deleteSubtask = (taskId: number, subtaskId: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          subtasks: task.subtasks.filter((sub) => sub.id !== subtaskId),
        };
      })
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = [...tasks];
    const draggedTaskIndex = newTasks.findIndex(
      (task) => task.id.toString() === draggableId
    );

    if (draggedTaskIndex === -1) {
      return;
    }

    const draggedTask = newTasks[draggedTaskIndex];
    const sourceColumnTasks = newTasks.filter(
      (task) => task.status === source.droppableId
    );
    const destinationColumnTasks = newTasks.filter(
      (task) => task.status === destination.droppableId
    );


    const sourceIndexInColumn = sourceColumnTasks.findIndex(
      (task) => task.id === draggedTask.id
    );
    sourceColumnTasks.splice(sourceIndexInColumn, 1);


    draggedTask.status = destination.droppableId;

    
    destinationColumnTasks.splice(destination.index, 0, draggedTask);

 
    const updatedTasks = newTasks.map((task) => {
      if (task.status === source.droppableId) {
        const tareaEncontrada = sourceColumnTasks.find((t) => t.id === task.id);
        return tareaEncontrada || task; 
      }
      if (task.status === destination.droppableId) {
        const tareaEncontrada = destinationColumnTasks.find((t) => t.id === task.id);
        return tareaEncontrada || task; 
      }
      return task;
    }).filter(Boolean); 

    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-pink-100 via-white to-rose-200 p-10 font-sans relative overflow-x-hidden">
      <svg className="absolute top-0 left-0 w-full h-[400px] z-0" viewBox="0 0 1440 320">
        <path fill="#f472b6" fillOpacity="0.15" d="M0,256L60,229.3C120,203,240,149,360,128C480,107,600,117,720,117.3C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
      </svg>

      <h1 className="text-4xl font-black text-gray-800 mb-12 tracking-tight relative z-10">📋 Task Dashboard</h1>

      <div className="flex gap-3 mb-10 relative z-10">
        <input
          className="bg-white/70 backdrop-blur-md border border-gray-300 rounded-lg px-4 py-2 w-64 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="New task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white px-5 py-2 rounded-full shadow-lg transition-all"
          onClick={addTask}
        >
          + Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
          {columns.map((column) => (
            <Droppable droppableId={column} key={column}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-6 min-h-[250px] border border-white/30"
                >
                  <h2 className="text-lg font-semibold text-gray-700 mb-5 uppercase tracking-widest">{column}</h2>
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                          <div
                            key={`task-${task.id}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white/80 rounded-xl shadow-md p-4 mb-4 border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out relative ${snapshot.isDragging ? 'z-[999] scale-[1.02]' : ''}`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-gray-800 text-base">{task.title}</span>
                              <button
                                className="text-red-400 hover:text-red-600 text-lg"
                                onClick={() => deleteTask(task.id)}
                              >
                                ✕
                              </button>
                            </div>

                            <input
                              className="bg-white/60 border border-gray-200 rounded px-3 py-1 w-full text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-pink-300"
                              placeholder="New subtask"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  addSubtask(task.id, e.currentTarget.value);
                                  e.currentTarget.value = "";
                                }
                              }}
                            />

                            <ul className="text-sm text-gray-700 space-y-1">
                              {task.subtasks.map((sub) => (
                                <li
                                  key={sub.id}
                                  className="flex justify-between items-center bg-white/50 rounded px-3 py-1 border border-gray-100"
                                >
                                  <span>{sub.title}</span>
                                  <button
                                    className="text-red-400 hover:text-red-600 text-xs"
                                    onClick={() => deleteSubtask(task.id, sub.id)}
                                  >
                                    ✕
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;