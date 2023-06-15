const tokenToBatteryMapping = new Map()

export const AddDataToMap = (batteryId,tokenId,) => {
    tokenToBatteryMapping.set(batteryId,tokenId)
}

export const HasToken = (batteryId) => {
    return (typeof tokenToBatteryMapping.get(batteryId) != "undefined")
}

export const GetTokenId = (batteryId) => {
    if(HasToken(batteryId)){
        return tokenToBatteryMapping.get(batteryId);
    }
}