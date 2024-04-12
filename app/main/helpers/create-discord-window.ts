import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
} from "electron";
import Store from "electron-store";

export const createDiscordWindow = (
  windowName: string,
  options: BrowserWindowConstructorOptions
) => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store<Rectangle>({ name });
  const defaultSize = {
    width: options.width,
    height: options.height,
  };
  let state = {};

  const restore = () => store.get(key, defaultSize);

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
  };

  const updateState = () => {
    state =
      win.isMaximized() || win.isMinimized()
        ? getCurrentPosition()
        : ensureVisibleOnSomeDisplay(getCurrentPosition());
  };

  const win = new BrowserWindow(options);

  win.on("resize", updateState);
  win.on("move", updateState);
  win.on("close", () => {
    store.set(key, getCurrentPosition());
  });

  const windowState = restore();

  win.setBounds(windowState);

  return win;
};
