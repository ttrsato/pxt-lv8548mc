// tests go here; this will not be compiled when this package is used as a library
basic.forever(() => {
    lv8548mc.setDC(Motor.CH1, AnalogPin.P0, AnalogPin.P1, DriveMode.DRV_OPEN)
    lv8548mc.setDirDC(Motor.CH1, RotationalDir.DIR_CW)
    lv8548mc.setSpeedDC(Motor.CH1, 100)
    lv8548mc.stopDC(Motor.CH2, StopState.STOP_OPEN)
})