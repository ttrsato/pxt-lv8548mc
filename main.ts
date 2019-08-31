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

enum RotationalDir {
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

    let dir1 = RotationalDir.DIR_CW
    let dir2 = RotationalDir.DIR_CW
    let drv1 = DriveMode.DRV_OPEN
    let drv2 = DriveMode.DRV_OPEN
    let speed1 = 0
    let speed2 = 0

    //% blockId=dc_set_motor block="Set DC %ch1 OUT1 to %out1|OUT2 to %out2|DriveMode %drv_mode"
    //% ch.defl=Motor.CH1
    //% out1.defl=AnalogPin.P13
    //% out2.defl=AnalogPin.P14
    //% drv_mode1.defl=DriveMode.DRV_OPEN
    export function dcSetMotor(ch: Motor, out1: AnalogPin, out2: AnalogPin, drv_mode: DriveMode): void {
        if (ch == Motor.CH1) {
            drv1 = drv_mode
            dc_out1 = out1
            dc_out2 = out2
            if (dir1 == RotationalDir.DIR_CW && drv1 == DriveMode.DRV_OPEN) {
                dc1_pwm = dc_out1
                dc1_fix = dc_out2
                pins.analogWritePin(dc1_pwm, 0)
                pins.analogWritePin(dc1_fix, 0)
            } else if (dir1 == RotationalDir.DIR_CW && drv1 == DriveMode.DRV_BRAKE) {
                dc1_pwm = dc_out2
                dc1_fix = dc_out1
                pins.analogWritePin(dc1_pwm, 1023)
                pins.analogWritePin(dc1_fix, 1023)
            } else if (dir1 == RotationalDir.DIR_CCW && drv1 == DriveMode.DRV_OPEN) {
                dc1_pwm = dc_out2
                dc1_fix = dc_out1
                pins.analogWritePin(dc1_pwm, 0)
                pins.analogWritePin(dc1_fix, 0)
            } else if (dir1 == RotationalDir.DIR_CCW && drv1 == DriveMode.DRV_BRAKE) {
                dc1_pwm = dc_out1
                dc1_fix = dc_out2
                pins.analogWritePin(dc1_pwm, 1023)
                pins.analogWritePin(dc1_fix, 1023)
            }
        } else {
            drv2 = drv_mode
            dc_out3 = out1
            dc_out4 = out2
            if (dir2 == RotationalDir.DIR_CW && drv2 == DriveMode.DRV_OPEN) {
                dc2_pwm = dc_out3
                dc2_fix = dc_out4
                pins.analogWritePin(dc2_pwm, 0)
                pins.analogWritePin(dc2_fix, 0)
            } else if (dir2 == RotationalDir.DIR_CW && drv2 == DriveMode.DRV_BRAKE) {
                dc2_pwm = dc_out4
                dc2_fix = dc_out3
                pins.analogWritePin(dc2_pwm, 1023)
                pins.analogWritePin(dc2_fix, 1023)
            } else if (dir2 == RotationalDir.DIR_CCW && drv2 == DriveMode.DRV_OPEN) {
                dc2_pwm = dc_out4
                dc2_fix = dc_out3
                pins.analogWritePin(dc2_pwm, 0)
                pins.analogWritePin(dc2_fix, 0)
            } else if (dir2 == RotationalDir.DIR_CCW && drv2 == DriveMode.DRV_BRAKE) {
                dc2_pwm = dc_out3
                dc2_fix = dc_out4
                pins.analogWritePin(dc2_pwm, 1023)
                pins.analogWritePin(dc2_fix, 1023)
            }
        }
    }

    //% blockId=dc_set_dir block="Set motor %ch|direction %dir"
    //% ch.defl=Motor.CH1
    //% dir.defl=Direction.DIR_CW
    export function dcSetDir(ch: Motor, dir: RotationalDir.DIR_CW): void {
        if (ch == Motor.CH1) {
            dir1 = dir
        } else {
            dir2 = dir
        }
        dcSetMotor(ch, dc_out1, dc_out2, drv1)
    }

    //% blockId=dc_set_speed block="RUN motor %ch|speed %speed"
    //% ch.defl=Motor.CH1
    //% speed.min=0 speed.max=1023
    export function dcSetSpeed(ch: Motor, speed: number): void {
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

    //% blockId=dc_stop_motor block="Stop %ch motor with %state"
    //% ch.defl=Motor.CH1
    //% state.defl=StopState.STOP_OPEN
    export function dcStopMotor(ch: Motor, state: StopState.STOP_OPEN): void {
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

}
