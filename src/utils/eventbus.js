import mitt from "mitt";

const eventBus = mitt();

eventBus.namespace = (ns) => {
  return {
    on: (type, handler) => eventBus.on(`${ns}:${type}`, handler),
    off: (type, handler) => eventBus.off(`${ns}:${type}`, handler),
    emit: (type, data) => eventBus.emit(`${ns}:${type}`, data)
  };
};

export default eventBus;