let BatteryDataList = [
]

export const getBatteryDataList = () => {
    return BatteryDataList;
};

export const getBatteryDataById = (id) => {
    return BatteryDataList.find((data) => data.Id === id);
}

export const addData = (newData) => {
    BatteryDataList.push(newData);
}

export const addOrUpdateData = (
    id,
    cycleIndex,
    dischargeTime,
    timeAt4_15V,
    timeConstantCurrent,
    decrementTime,
    maxVoltageDischarge,
    minVoltageDischarge,
    chargeTime,
    remainingUsefulLife) => {
    BatteryDataList.push({
        Id: id,
        CycleIndex: cycleIndex,
        DischargeTime: dischargeTime,
        TimeAt4_15V: timeAt4_15V,
        TimeConstantCurrent: timeConstantCurrent,
        DecrementTime: decrementTime,
        MaxVoltageDischarge: maxVoltageDischarge,
        MinVoltageDischarge: minVoltageDischarge,
        ChargeTime: chargeTime,
        RemainingUsefulLife: remainingUsefulLife,
    });
};