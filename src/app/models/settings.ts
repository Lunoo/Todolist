export type Theme = 'dark' | 'basic';

export class Settings {
    showMenu: boolean;
    synchronize: boolean;
    theme: Theme;

    constructor({showMenu = false, synchronize = true, theme = 'basic'} = {}) {
        this.showMenu = showMenu;
        this.synchronize = synchronize;
        this.theme = theme as Theme;
    }
}
