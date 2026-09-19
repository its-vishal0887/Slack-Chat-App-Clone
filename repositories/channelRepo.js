import Channel from '../schema/channel.js';
import crudRepo from './crudRepo.js';

const channelRepo = {
  ...crudRepo(Channel)
};

export default channelRepo;
