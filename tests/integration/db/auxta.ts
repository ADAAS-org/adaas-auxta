import { EnvUtil } from "@auxta/utils/Env.util";
EnvUtil.load();
import { Auxta } from "@auxta/core/Auxta";
import { RunningTrailVector } from "./vectors/Trail.vector";
import { HardTrail } from "./vectors/HardTrail.vector";
import { AuxtaCommand } from "@auxta/lib/AuxtaCommand.class";
import { DEFAULT_RUNNING_TRAILS } from "./seed/trails.seed";
import { RunningTrailIndex } from "./indexes/RunningTrail.index";




export const auxta = new Auxta({
    client: 'integration-test-client'
});



export async function initDB() {
    await auxta.ready;

    console.log('Auxta is ready for integration tests');
    await Promise.all([
        auxta.query(new AuxtaCommand().add(...DEFAULT_RUNNING_TRAILS.Default)),
        auxta.query(new AuxtaCommand().add(...DEFAULT_RUNNING_TRAILS.Hard))
    ]);
}


export async function clearDB() {

    await Promise.all([
        auxta.query(new AuxtaCommand().drop(RunningTrailIndex)),
        auxta.query(new AuxtaCommand('hard_running_trail').drop())
    ]);

    await auxta.destroy();

}