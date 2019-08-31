enum Motor {
    CH1 = 0,
    CH2 = 1
}

enum DriveMode {
    //% block="Open"
    DRV_OPEN = 0,
    //% block="Brake"
    DRV_BRAKE = 1,
}

enum StopState {
    //% block="Open"
    STOP_OPEN = 0,
    //% block="Brake"
    STOP_BRAKE = 1,
}

enum Direction {
    //% block="Forward"
    DIR_CW = 0,
    //% block="Reverse"
    DIR_CCW = 1,
}

//% weight=70 icon="\uf2db" color=#555555 block="LV8548MC"
namespace lv8548mc {
    let dc1_pwm = AnalogPin.P13
    let dc1_fix = AnalogPin.P14
    let dc2_pwm = AnalogPin.P15
    let dc2_fix = AnalogPin.P16

    let step_o1 = DigitalPin.P13
    let step_o2 = DigitalPin.P14
    let step_o3 = DigitalPin.P15
    let step_o4 = DigitalPin.P16

    let dir1 = Direction.DIR_CW
    let dir2 = Direction.DIR_CW

    //% blockId=show_strings block="Set DC CH1 OUT1 to %out1|OUT2 to %out2|DriveMode to %drv_mode"
    //% out1.defl=AnalogPin.P13
    //% out2.defl=AnalogPin.P14
    //% drv_mode.defl=DriveMode.DRV_OPEN
    export function setDC_CH1(out1: AnalogPin, out2: AnalogPin, drv_mode: DriveMode): void {
        if (dir1 == Direction.DIR_CW && drv_mode == DriveMode.DRV_OPEN) {
            dc1_pwm = out1
            dc1_fix = out2
            pins.analogWritePin(dc1_pwm, 0)
            pins.analogWritePin(dc1_fix, 0)
        } else if (dir1 == Direction.DIR_CW && drv_mode == DriveMode.DRV_BRAKE) {
            dc1_pwm = out2
            dc1_fix = out1
            pins.analogWritePin(dc1_pwm, 1023)
            pins.analogWritePin(dc1_fix, 1023)
        } else if (dir1 == Direction.DIR_CCW && drv_mode == DriveMode.DRV_OPEN) {
            dc1_pwm = out2
            dc1_fix = out1
            pins.analogWritePin(dc1_pwm, 0)
            pins.analogWritePin(dc1_fix, 0)
        } else if (dir1 == Direction.DIR_CCW && drv_mode == DriveMode.DRV_BRAKE) {
            dc1_pwm = out1
            dc1_fix = out2
            pins.analogWritePin(dc1_pwm, 1023)
            pins.analogWritePin(dc1_fix, 1023)
        }
    }

    //% blockId=show_strings block="Set DC CH2 OUT3 to %out3|OUT4 to %out4|DriveMode to %drv_mode"
    //% out3.defl=AnalogPin.P15
    //% out4.defl=AnalogPin.P16
    //% drv_mode.defl=DriveMode.DRV_OPEN
    export function setDC_CH2(out3: AnalogPin, out4: AnalogPin, drv_mode: DriveMode): void {
        if (dir2 == Direction.DIR_CW && drv_mode == DriveMode.DRV_OPEN) {
            dc2_pwm = out3
            dc2_fix = out4
            pins.analogWritePin(dc1_pwm, 0)
            pins.analogWritePin(dc1_fix, 0)
        } else if (dir2 == Direction.DIR_CW && drv_mode == DriveMode.DRV_BRAKE) {
            dc2_pwm = out4
            dc2_fix = out3
            pins.analogWritePin(dc1_pwm, 1023)
            pins.analogWritePin(dc1_fix, 1023)
        } else if (dir2 == Direction.DIR_CCW && drv_mode == DriveMode.DRV_OPEN) {
            dc2_pwm = out4
            dc2_fix = out3
            pins.analogWritePin(dc1_pwm, 0)
            pins.analogWritePin(dc1_fix, 0)
        } else if (dir2 == Direction.DIR_CCW && drv_mode == DriveMode.DRV_BRAKE) {
            dc2_pwm = out3
            dc2_fix = out4
            pins.analogWritePin(dc1_pwm, 1023)
            pins.analogWritePin(dc1_fix, 1023)
        }
    }

    //% blockId=show_strings block="Set Stepper OUT1 to %out1|OUT2 to %out2|OUT3 to %out3|OUT4 to %out4"
    //% out1.defl=DigitalPin.P13
    //% out2.defl=DigitalPin.P14
    //% out3.defl=DigitalPin.P15
    //% out4.defl=DigitalPin.P16
    export function setSTEP(out1: DigitalPin, out2: DigitalPin, out3: DigitalPin, out4: DigitalPin): void {
        step_o1 = out1
        step_o2 = out2
        step_o3 = out3
        step_o4 = out4
        pins.digitalWritePin(step_o1, 0)
        pins.digitalWritePin(step_o2, 0)
        pins.digitalWritePin(step_o3, 0)
        pins.digitalWritePin(step_o4, 0)
    }
}
