// tests go here; this will not be compiled when this package is used as a library
basic.forever(() => {
    lv8548mc.dcSetMotor(Motor.CH1, AnalogPin.P0, AnalogPin.P1, DriveMode.DRV_OPEN)
    lv8548mc.dcStopMotor(Motor.CH2, StopState.STOP_OPEN)
})