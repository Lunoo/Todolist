export type Theme = 'dark' | 'light';

export class Settings {
    showMenu: boolean;
    synchronize: boolean;
    theme: Theme;

    constructor({showMenu = false, synchronize = false, theme = 'light'} = {}) {
        this.showMenu = showMenu;
        this.synchronize = synchronize;
        this.theme = theme as Theme;
    }
}
