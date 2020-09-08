import { Application, AppConstructorOptions } from 'spectron';
import { MenuItem } from 'electron';
export declare class SpectronMenuAddon {
    private app;
    createApplication(options: AppConstructorOptions): Application;
    clickMenu(...labels: string[]): Promise<void>;
    getMenuItem(...labels: string[]): Promise<MenuItem>;
}
declare const spectronMenuAddon: SpectronMenuAddon;
export default spectronMenuAddon;
