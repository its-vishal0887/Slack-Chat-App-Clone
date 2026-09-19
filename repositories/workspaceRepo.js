// import workSpace from '../schema/workspaceSchema.js';
import { StatusCodes } from 'http-status-codes';

import crudRepo from '../repositories/crudRepo.js';
import User from '../schema/users.js'
import workSpace from '../schema/workspaceSchema.js';
import ClientError from '../utils/errors/clientError.js';

const workSpaceRepo = {
  ...crudRepo(workSpace),
  getWrokSpaceByName: async function (workSpaceName) {
    const workSpace = await workSpace.findOne({
      name: workSpaceName
    });

    if (!workSpace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
  },
  getWrokSpaceByJoinCode: async function (joinCode) {
    const workSpace = await workSpace.findOne({
      joinCode
    });

    if (!workSpace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
  },
  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await workSpace.findById(workspaceId);

    if (!workspace) {
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
    const member = workSpace.member.find(
      (member) => member.memberId.toString() === memberId
    );
    if (member) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Member already exists',
        statusCode: StatusCodes.FORBIDDEN
      });
    }
    workSpace.member.push({ memberId, role });
    await workSpace.save();
    return workSpace;
  },
  addChannelToWorkspace: async function () {},
  fetchAllWorkspaceByMemberId: async function () {}
};

export default workSpaceRepo;
