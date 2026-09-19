import { StatusCodes } from 'http-status-codes';

import User from '../schema/users.js';
import workSpace from '../schema/workspaceSchema.js';
import ClientError from '../utils/errors/clientError.js';
import channelRepo from './channelRepo.js';
import crudRepo from './crudRepo.js';

const workSpaceRepo = {
  ...crudRepo(workSpace),
  getWrokSpaceByName: async function (workSpaceName) {
    const workspaceDoc = await workSpace.findOne({
      name: workSpaceName
    });

    if (!workspaceDoc) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspaceDoc;
  },
  getWrokSpaceByJoinCode: async function (joinCode) {
    const workspaceDoc = await workSpace.findOne({
      joinCode
    });

    if (!workspaceDoc) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspaceDoc;
  },
  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspaceDoc = await workSpace.findById(workspaceId);

    if (!workspaceDoc) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const member = workspaceDoc.members.find(
      (memberItem) => memberItem.memberId.toString() === memberId
    );

    if (member) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Member already exists',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    workspaceDoc.members.push({ memberId, role });
    await workspaceDoc.save();
    return workspaceDoc;
  },
  addChannelToWorkspace: async function (workspaceId, channelName) {
    const workspaceDoc = await workSpace
      .findById(workspaceId)
      .populate('channels');

    if (!workspaceDoc) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isChannelAlreadyPartOfWrkSpace = workspaceDoc.channels.some(
      (channel) => channel.name === channelName
    );

    if (isChannelAlreadyPartOfWrkSpace) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: 'Channel already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const channel = await channelRepo.create({ name: channelName });
    workspaceDoc.channels.push(channel._id);
    await workspaceDoc.save();

    return workspaceDoc;
  },
  fetchAllWorkspaceByMemberId: async function (memberId) {
    const workspaceDocs = await workSpace
      .find({ 'members.memberId': memberId })
      .populate('members.memberId', 'username email avatar');

    return workspaceDocs;
  }
};

export default workSpaceRepo;
