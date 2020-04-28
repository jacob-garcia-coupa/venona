const _ = require('lodash');
const Base = require('../../BaseJob');
const CreatePodTask = require('./CreatePod.task');
const StatusesToBeTerminated = ['cpu'];

const ERROR_MESSAGES = {
	FAILED_TO_EXECUTE_TASK: 'Failed to run task PodStatusDecoratorTask',
};

class PodStatusDecoratorTask extends Base {

	constructor(codefreshAPI, kubernetesAPI, logger) {
		super(codefreshAPI, kubernetesAPI, logger);
		this.CreatePodTask = new CreatePodTask(codefreshAPI, kubernetesAPI, logger);
	}

	async run(task) {
		this.logger.info('Running CreatePod task');
		try {
			const pod = await this.CreatePodTask.exec(task);
			await new Promise(resolve => {
				setTimeout(resolve, 30000);
			});
			// Check pod status
			if (pod) {
				const name = _.get(pod, 'body.metadata.name');
				const namespace = _.get(pod, 'body.metadata.namespace');
				const service = await this.getKubernetesService(_.get(task, 'metadata.reName'));
				const podSnapshot = await service.getPod(this.logger, namespace, name);
				if (podSnapshot) {
					const phase = _.get(podSnapshot,'status.phase');
					if (_.includes(StatusesToBeTerminated, phase)) {
						// send termination call to codefresh
					}

				}
			}
			
			return pod;
		} catch (err) {
			const message = `${ERROR_MESSAGES.FAILED_TO_EXECUTE_TASK}: ${err.message}`;
			this.logger.error(message);
			throw new Error(message);
		}
	}

	async validate(task) {
		return this.CreatePodTask.validate(task);
	}

}
module.exports = PodStatusDecoratorTask;