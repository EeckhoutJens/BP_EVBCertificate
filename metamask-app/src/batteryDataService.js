let BatteryDataList = [
    {
        Id: "1",
        CycleIndex: 2,
        DischargeTime: 1,
        TimeAt4_15V: 3,
        TimeConstantCurrent: 5,
        DecrementTime: 20,
        MaxVoltageDischarge: 1,
        MinVoltageDischarge: 20,
        ChargeTime: 2,
        RemainingUsefulLife: 0,
    },
    {
        Id: "2",
        CycleIndex: 2,
        DischargeTime: 1,
        TimeAt4_15V: 3,
        TimeConstantCurrent: 5,
        DecrementTime: 20,
        MaxVoltageDischarge: 1,
        MinVoltageDischarge: 20,
        ChargeTime: 2,
        RemainingUsefulLife: 0,
    },
    {
        Id: "3",
        CycleIndex: 2,
        DischargeTime: 1,
        TimeAt4_15V: 3,
        TimeConstantCurrent: 5,
        DecrementTime: 20,
        MaxVoltageDischarge: 1,
        MinVoltageDischarge: 20,
        ChargeTime: 2,
        RemainingUsefulLife: 0,
    },
]

export const getBatteryDataList = () => {
    return BatteryDataList;
};

export const getBatteryDataById = (id) => {
    return BatteryDataList.find((data) => data.Id === id);
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
    // Check if the data item already exists in the dataList
    const index = BatteryDataList.findIndex((data) => data.Id === id);

    if (index !== -1) {
        // If the data item exists, update its Cycle property
        BatteryDataList[index].CycleIndex = cycleIndex;
        BatteryDataList[index].DischargeTime = dischargeTime;
        BatteryDataList[index].TimeAt4_15V = timeAt4_15V;
        BatteryDataList[index].TimeConstantCurrent = timeConstantCurrent;
        BatteryDataList[index].DecrementTime = decrementTime;
        BatteryDataList[index].MaxVoltageDischarge = maxVoltageDischarge;
        BatteryDataList[index].MinVoltageDischarge = minVoltageDischarge;
        BatteryDataList[index].ChargeTime = chargeTime;
        BatteryDataList[index].RemainingUsefulLife = remainingUsefulLife;
    } else {
        // If the data item doesn't exist, add it to the dataList
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
    }
};