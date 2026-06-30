import { getMeAPI, loginEmailAPI, loginSSOAPI, logoutAPI, registerEmailAPI, registerSSOAPI } from './auth.api'
import { claimDeviceAPI, deleteDeviceAPI, getDeviceAPI, getDevicesAPI, getDeviceStatsAPI } from './devices.api'
import { addUserToOrgAPI, createOrgAPI, deleteOrgAPI, getOrgAPI, getOrgsAPI, getOrgDevicesAPI, getOrgUsersAPI, removeUserFromOrgAPI, updateOrgAPI } from './orgs.api'

export default {
    auth: {
        email: {
            register: registerEmailAPI,
            login: loginEmailAPI,
        },
        sso: {
            register: registerSSOAPI,
            login: loginSSOAPI,
        },
        logout: logoutAPI,
        getMe: getMeAPI,
    },
    devices: {
        stats: getDeviceStatsAPI,
        getAll: getDevicesAPI,
        get: getDeviceAPI,
        delete: deleteDeviceAPI,
        claim: claimDeviceAPI,
    },
    orgs: {
        getAll: getOrgsAPI,
        get: getOrgAPI,
        getUsers: getOrgUsersAPI,
        getDevices: getOrgDevicesAPI,
        create: createOrgAPI,
        update: updateOrgAPI,
        delete: deleteOrgAPI,
        addUser: addUserToOrgAPI,
        removeUser: removeUserFromOrgAPI,
    },
}