let BatteryDataList = []

export const getBatteryDataList = (items) => {
    const data = Array.from(items);
    console.log(data);
    data.forEach(element => {
        // Make array out of element data so we can properly use it
        const values = Object.values(element);
        const id = values[0];
        const cycleIndex = values[1];
        const dischargeTime = values[2];
        const timeAt4_15V = values[6];
        const timeConstantCurrent = values[7];
        const decrementTime = values[3];
        const maxVoltageDischarge = values[4];
        const minVoltageDischarge = values[5];
        const chargeTime = values[8];
        const remainingUsefulLife = values[9];

        BatteryDataList.push({ id, cycleIndex, dischargeTime, timeAt4_15V, timeConstantCurrent, decrementTime, maxVoltageDischarge, minVoltageDischarge, chargeTime, remainingUsefulLife });
    });
    
    return BatteryDataList;
};

export const getBatteryDataById = (id) => {
    return BatteryDataList.find((data) => data.id === id);
}