/* This is free and unencumbered software released into the public domain. */
import { NETWORKS } from '@aurora-is-near/engine';
export const localConfig = {
    debug: false,
    verbose: false,
    force: false,
    database: undefined,
    port: 8545,
    network: 'local',
    endpoint: 'http://127.0.0.1:3030',
    engine: 'aurora.test.near',
    signer: 'test.near',
    signerKey: undefined,
    signerKeys: [],
    blacklistIPs: new Set(),
    blacklistEOAs: new Set(),
    blacklistCAs: new Set(),
    writable: true,
    errorLog: undefined,
};
export function parseConfig(options, config, env) {
    const networkID = options.network || env.NEAR_ENV || config.network;
    if (!networkID) {
        throw new Error(`Missing network ID. Use: --network <network>`);
    }
    const network = NETWORKS.get(networkID);
    if (!network) {
        throw new Error(`Unknown network ID: '${networkID}'`);
    }
    const debug = options.debug || config.debug;
    return [
        network,
        {
            debug: debug,
            verbose: debug || options.verbose || config.verbose,
            force: options.force || config.force,
            database: options.database || config.database,
            port: parseInt(options.port || config.port),
            network: networkID,
            endpoint: options.endpoint ||
                env.NEAR_URL ||
                config.endpoint ||
                network.nearEndpoint,
            engine: options.engine ||
                env.AURORA_ENGINE ||
                config.engine ||
                network.contractID,
            signer: options.signer || env.NEAR_MASTER_ACCOUNT || config.signer,
            signerKey: options.signerKey || config.signerKey,
            signerKeys: config.signerKeys || [],
            blacklistIPs: new Set(config.blacklistIPs || []),
            blacklistEOAs: new Set(config.blacklistEOAs || []),
            blacklistCAs: new Set(config.blacklistCAs || []),
            batchSize: parseInt(options.batchSize || config.batchSize || '1000'),
            writable: config.writable !== undefined ? config.writable : true,
            errorLog: config.errorLog,
        },
    ];
}
