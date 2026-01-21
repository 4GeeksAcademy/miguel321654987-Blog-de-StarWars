export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    personajes: [],
    favoritos: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_personajes":
      return {
        ...store,
        personajes: action.payload
      };

case "add_favorito":
  return {
    ...store,
    favoritos: [...store.favoritos, action.payload] // Copia lo que había y añade el nuevo
  };

// PARA ELIMINAR (Recibiendo el ID)
case "delete_favorito":
  return {
    ...store,
    favoritos: store.favoritos.filter((item) => item.id !== action.payload)
  };



    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }
}
