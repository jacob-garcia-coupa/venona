const Base = require('../../BaseJob');
const CreatePodTask = require('../CreatePod.task');

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
			this.kubernetesAPI.getPod(this.logger, pod.namespace, pod.name);
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