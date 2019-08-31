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
    let dc_out1 = AnalogPin.P13
    let dc_out2 = AnalogPin.P14
    let dc_out3 = AnalogPin.P15
    let dc_out4 = AnalogPin.P16

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
    let drv1 = DriveMode.DRV_OPEN
    let drv2 = DriveMode.DRV_OPEN
    let speed1 = 0
    let speed2 = 0

    //% blockId=show_strings block="Set DC CH1 OUT1 to %out1|OUT2 to %out2|DriveMode to %drv_mode"
    //% out1.defl=AnalogPin.P13
    //% out2.defl=AnalogPin.P14
    //% drv_mode1.defl=DriveMode.DRV_OPEN
    export function setDC_CH1(out1: AnalogPin, out2: AnalogPin, drv_mode1: DriveMode): void {
        drv1 = drv_mode1
        dc_out1 = out1
        dc_out2 = out2
        if (dir1 == Direction.DIR_CW && drv1 == DriveMode.DRV_OPEN) {
            dc1_pwm = dc_out1
            dc1_fix = dc_out2
            pins.analogWritePin(dc1_pwm, 0)
            pins.analogWritePin(dc1_fix, 0)
        } else if (dir1 == Direction.DIR_CW && drv1 == DriveMode.DRV_BRAKE) {
            dc1_pwm = dc_out2
            dc1_fix = dc_out1
            pins.analogWritePin(dc1_pwm, 1023)
            pins.analogWritePin(dc1_fix, 1023)
        } else if (dir1 == Direction.DIR_CCW && drv1 == DriveMode.DRV_OPEN) {
            dc1_pwm = dc_out2
            dc1_fix = dc_out1
            pins.analogWritePin(dc1_pwm, 0)
            pins.analogWritePin(dc1_fix, 0)
        } else if (dir1 == Direction.DIR_CCW && drv1 == DriveMode.DRV_BRAKE) {
            dc1_pwm = dc_out1
            dc1_fix = dc_out2
            pins.analogWritePin(dc1_pwm, 1023)
            pins.analogWritePin(dc1_fix, 1023)
        }
    }

    //% blockId=show_strings block="Set DC CH2 OUT3 to %out3|OUT4 to %out4|DriveMode to %drv_mode"
    //% out3.defl=AnalogPin.P15
    //% out4.defl=AnalogPin.P16
    //% drv_mode2.defl=DriveMode.DRV_OPEN
    export function setDC_CH2(out3: AnalogPin, out4: AnalogPin, drv_mode2: DriveMode): void {
        drv2 = drv_mode2
        dc_out3 = out3
        dc_out4 = out4
        if (dir2 == Direction.DIR_CW && drv2 == DriveMode.DRV_OPEN) {
            dc2_pwm = dc_out3
            dc2_fix = dc_out4
            pins.analogWritePin(dc2_pwm, 0)
            pins.analogWritePin(dc2_fix, 0)
        } else if (dir2 == Direction.DIR_CW && drv2 == DriveMode.DRV_BRAKE) {
            dc2_pwm = dc_out4
            dc2_fix = dc_out3
            pins.analogWritePin(dc2_pwm, 1023)
            pins.analogWritePin(dc2_fix, 1023)
        } else if (dir2 == Direction.DIR_CCW && drv2 == DriveMode.DRV_OPEN) {
            dc2_pwm = dc_out4
            dc2_fix = dc_out3
            pins.analogWritePin(dc2_pwm, 0)
            pins.analogWritePin(dc2_fix, 0)
        } else if (dir2 == Direction.DIR_CCW && drv2 == DriveMode.DRV_BRAKE) {
            dc2_pwm = dc_out3
            dc2_fix = dc_out4
            pins.analogWritePin(dc2_pwm, 1023)
            pins.analogWritePin(dc2_fix, 1023)
        }
    }

    //% blockId=show_strings block="Set motor %ch|direction %dir"
    //% ch.defl=Motor.CH1
    //% dir.defl=Direction.DIR_CW
    export function setDirDC(ch: Motor, dir: Direction.DIR_CW): void {
        if (ch == Motor.CH1) {
            dir1 = dir
            setDC_CH1(dc_out1, dc_out2, drv1)
        } else {
            dir2 = dir
            setDC_CH2(dc_out3, dc_out4, drv2)
        }
    }

    //% blockId=show_strings block="RUN motor %ch|speed %speed"
    //% ch.defl=Motor.CH1
    //% speed.min=0 speed.max=1023
    export function setSpeedDC(ch: Motor, speed: number): void {
        if (ch == Motor.CH1) {
            speed1 = speed
            let tmp_duty = 0
            if (drv1 == DriveMode.DRV_OPEN) {
                tmp_duty = speed1
            } else {
                tmp_duty = 1023 - speed1
            }
            pins.analogWritePin(dc1_pwm, tmp_duty)
        } else {
            speed2 = speed
            let tmp_duty = 0
            if (drv2 == DriveMode.DRV_OPEN) {
                tmp_duty = speed2
            } else {
                tmp_duty = 1023 - speed2
            }
            pins.analogWritePin(dc2_pwm, tmp_duty)
        }
    }

    //% blockId=show_strings block="Stop %ch motor with %state"
    //% ch.defl=Motor.CH1
    //% state.defl=StopState.STOP_OPEN
    export function runDC(ch: Motor, state: StopState.STOP_OPEN): void {
    }

    //% blockId=show_strings block="Stop %ch motor with %state"
    //% ch.defl=Motor.CH1
    //% state.defl=StopState.STOP_OPEN
    export function stopDC(ch: Motor, state: StopState.STOP_OPEN): void {
        let pwm = dc1_pwm
        let fix = dc1_fix
        if (ch == Motor.CH2) {
            pwm = dc2_pwm
            fix = dc2_fix
        }
        if (state == StopState.STOP_OPEN) {
            pins.analogWritePin(pwm, 0)
            pins.analogWritePin(fix, 0)
        } else if (state == StopState.STOP_BRAKE) {
            pins.analogWritePin(pwm, 1023)
            pins.analogWritePin(fix, 1023)
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
