/* eslint-disable @typescript-eslint/no-explicit-any */
import environment from "@/app/config/environment";

const should = (lvl: 'debug' | 'info' | 'warn' | 'error') =>
    ['debug', 'info', 'warn', 'error'].indexOf(lvl) >=
    ['debug', 'info', 'warn', 'error'].indexOf(environment.logLevel as any);

export const log = {
    debug: (...a: unknown[]) => should('debug') && console.debug('[DEBUG]', ...a),
    info : (...a: unknown[]) => should('info')  && console.info ('[INFO]' , ...a),
    warn : (...a: unknown[]) => should('warn')  && console.warn ('[WARN]' , ...a),
    error: (...a: unknown[]) => console.error('[ERROR]', ...a),
};
