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

enum StepDriveMode {
    //% block="1/1"
    STP_DRV_1_1 = 0,
    //% block="1/2"
    STP_DRV_1_2 = 1,
}

enum StepStopState {
    //% block="Free"
    STOP_FREE = 0,
    //% block="Hold"
    STOP_HOLD = 1,
}

//% weight=70 icon="\uf2db" color=#00b841 block="LV8548MC"
//% groups="['DC', 'STEPPER', 'STEPPER units', 'STEPPER to steps', 'STEPPER to ms/steps']"
namespace lv8548mc {
    let dc_out1 = AnalogPin.P0
    let dc_out2 = AnalogPin.P1
    let dc_out3 = AnalogPin.P8
    let dc_out4 = AnalogPin.P16

    let dc1_pwm = AnalogPin.P0
    let dc1_fix = AnalogPin.P1
    let dc2_pwm = AnalogPin.P8
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

    let step_drv_mode = StepDriveMode.STP_DRV_1_1
    let step_state = StepStopState.STOP_FREE

    let step_phase = 0
    let step_phase_num = 4

    let step_run = 0

    let pat_1_1 = [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1]
    ];

    let pat_1_2 = [
        [1, 0, 0, 1],
        [1, 0, 0, 0],
        [1, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 1],
        [0, 0, 0, 1]
    ];

    //% blockId=dc_set_motor block="D: set motor  %ch|IN1/3 to      %out1|IN2/4 to      %out2|drive mode    %drv_mode"
    //% group="DC"
    //% ch.defl=Motor.CH1
    //% out1.defl=AnalogPin.P0
    //% out2.defl=AnalogPin.P1
    //% drv_mode.defl=DriveMode.DRV_OPEN
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

    //% blockId=dc_set_dir block="D: set  motor %ch |direction to %dir"
    //% group="DC"
    //% ch.defl=Motor.CH1
    //% dir.defl=RotationalDir.DIR_CW
    function dcSetDir(ch: Motor, dir: RotationalDir): void {
        if (ch == Motor.CH1) {
            dir1 = dir
            dcSetMotor(ch, dc_out1, dc_out2, drv1)
        } else {
            dir2 = dir
            dcSetMotor(ch, dc_out3, dc_out4, drv2)
        }
    }

    //% blockId=dc_set_speed block="D: run  motor %ch %d at %speed \\%"
    //% group="DC"
    //% ch.defl=Motor.CH1
    //% speed.min=0 speed.max=100
    export function dcSetSpeed(ch: Motor, dir: RotationalDir, speed: number): void {
        dcSetDir(ch, dir)
        if (ch == Motor.CH1) {
            speed1 = (speed * 1023) / 100
            let tmp_duty = 0
            if (drv1 == DriveMode.DRV_OPEN) {
                tmp_duty = speed1
            } else {
                tmp_duty = 1023 - speed1
            }
            pins.analogWritePin(dc1_pwm, tmp_duty)
        } else {
            speed2 = (speed * 1023) / 100
            let tmp_duty = 0
            if (drv2 == DriveMode.DRV_OPEN) {
                tmp_duty = speed2
            } else {
                tmp_duty = 1023 - speed2
            }
            pins.analogWritePin(dc2_pwm, tmp_duty)
        }
    }

    //% blockId=dc_stop_motor block="D: stop motor %ch %state"
    //% group="DC"
    //% ch.defl=Motor.CH1
    //% state.defl=StopState.STOP_OPEN
    export function dcStopMotor(ch: Motor, state: StopState): void {
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

    // STEPPER /////////////////////////////////////////////////

    //% blockId=step_set_motor block="S: set  stepper |IN1:A  to  %out1|IN2:A' to  %out2|IN3:B  to  %out3|IN4:B' to  %out4|Excitation %drv_mode"
    //% group="STEPPER"
    //% out1.defl=DigitalPin.P13
    //% out2.defl=DigitalPin.P14
    //% out3.defl=DigitalPin.P15
    //% out4.defl=DigitalPin.P16
    //% drv_mode.defl=StepDriveMode.STP_DRV_1_1
    export function stepSetMotor(
        out1: DigitalPin, out2: DigitalPin, out3: DigitalPin, out4: DigitalPin,
        drv_mode: StepDriveMode): void {
        step_drv_mode = drv_mode
        step_o1 = out1
        step_o2 = out2
        step_o3 = out3
        step_o4 = out4
        //step_phase = 0
        step_phase_num = (step_drv_mode == StepDriveMode.STP_DRV_1_1) ? 4 : 8
        stepStopMotor(StepStopState.STOP_FREE)
    }

    function setStepPins(phase: number) {
        if (step_drv_mode == StepDriveMode.STP_DRV_1_1) {
            pins.digitalWritePin(step_o1, pat_1_1[phase][0])
            pins.digitalWritePin(step_o2, pat_1_1[phase][0] == 0 ? 1 : 0)
            pins.digitalWritePin(step_o3, pat_1_1[phase][1])
            pins.digitalWritePin(step_o4, pat_1_1[phase][1] == 0 ? 1 : 0)
        } else if (step_drv_mode == StepDriveMode.STP_DRV_1_2) {
            pins.digitalWritePin(step_o1, pat_1_2[phase][0])
            pins.digitalWritePin(step_o2, pat_1_2[phase][1])
            pins.digitalWritePin(step_o3, pat_1_2[phase][2])
            pins.digitalWritePin(step_o4, pat_1_2[phase][3])
        }
    }

    //% blockId=step_rotate_motor block="S: run  stepper %dir %steps steps %msps ms/step"
    //% group="STEPPER"
    //% dir=RotationalDir.DIR_CW
    //% steps.defl=10
    //% steps.min=1
    //% msps.defl=100
    //% msps.min=1 msps.max=1000
    //% msps.shadow=timePicker
    export function stepRotateMotor(dir: RotationalDir, steps: number, msps: number) {
        if (step_run) return
        step_run = 1
        if (step_state == StepStopState.STOP_FREE) {
            stepStopMotor(StepStopState.STOP_HOLD)
        }
        let inc = (dir == RotationalDir.DIR_CW) ? 1 : -1
        for (let i = 0; i < steps; i++) {
            step_phase += inc
            if (step_phase == step_phase_num) {
                step_phase = 0
            } else if (step_phase == -1) {
                step_phase = step_phase_num - 1
            }
            setStepPins(step_phase)
            basic.pause(msps)
        }
        step_run = 0
    }

    //% blockId=step_stop_motor block="S: stop stepper %stat"
    //% group="STEPPER"
    //% state.defl=StepStopState.STOP_FREE
    export function stepStopMotor(state: StepStopState) {
        step_state = state
        if (step_state == StepStopState.STOP_FREE) {
            pins.digitalWritePin(step_o1, 0)
            pins.digitalWritePin(step_o2, 0)
            pins.digitalWritePin(step_o3, 0)
            pins.digitalWritePin(step_o4, 0)
        } else if (step_state == StepStopState.STOP_HOLD) {
            pins.digitalWritePin(step_o1, pat_1_2[step_phase][0])
            pins.digitalWritePin(step_o2, pat_1_2[step_phase][1])
            pins.digitalWritePin(step_o3, pat_1_2[step_phase][2])
            pins.digitalWritePin(step_o4, pat_1_2[step_phase][3])
        }
    }

    //% blockId=step_rotate_motor_acc block="S: run  stepper accel|dirction      %dir|steps         %steps|start ms/step %f_msps|end   ms/step %t_msps"
    //% group="STEPPER"
    //% steps.defl=96
    //% f_msps.defl=50
    //% f_msps.shadow=timePicker
    //% t_msps.defl=2
    //% t_msps.shadow=timePicker
    export function stepRotateMotorAcc(dir: RotationalDir, steps: number, f_msps: number, t_msps: number) {
        if (step_run) return
        step_run = 1
        //let abs_steps = Math.abs(steps)
        let dmsps = (t_msps - f_msps) / steps
        let cmsps = f_msps
        if (step_state == StepStopState.STOP_FREE) {
            stepStopMotor(StepStopState.STOP_HOLD)
            // basic.pause(cmsps)
        }
        let inc = (dir == RotationalDir.DIR_CW) ? 1 : -1
        for (let i = 0; i < steps; i++) {
            step_phase += inc
            if (step_phase == step_phase_num) {
                step_phase = 0
            } else if (step_phase == -1) {
                step_phase = step_phase_num - 1
            }
            setStepPins(step_phase)
            basic.pause(cmsps)
            cmsps += dmsps
            if (dmsps > 0 && cmsps > t_msps) {
                cmsps = t_msps
            } else if (dmsps < 0 && cmsps < t_msps) {
                cmsps = t_msps
            }
        }
        step_run = 0
    }

    //% blockId=step_rotate_motor_trap block="S: run  stepper trap|direction      %dir|total steps    %ca_steps|total ms       %ta_ms|start ms/step  %s_msps|accel ms       %t1_ms"
    //% group="STEPPER"
    //% ca_steps.defl=96
    //% ta_ms.shadow=timePicker
    //% ta_ms.defl=2000
    //% t1_ms.shadow=timePicker
    //% t1_ms.defl=500
    //% s1_msps.defl=100
    //% s1_msps.shadow=timePicker
    export function stepRotateMotorTrap(dir: RotationalDir, ca_steps: number, ta_ms: number, t1_ms: number, s1_msps: number) {
        if (ca_steps < 2) {
            return
        }
        if (step_run) return
        step_run = 1
        let t2_ms = ta_ms - t1_ms * 2
        let a = ca_steps - 2
        let b = ca_steps * s1_msps - 4 * t1_ms - t2_ms
        let c = -t2_ms * s1_msps
        let d = Math.sqrt(b * b - 4 * a * c)
        let s2_msps = (-b + d) / 2 / a
        if (s2_msps < 0) {
            s2_msps = (-b - d) / 2 / a
            if (s2_msps < 0) {
                s2_msps = s1_msps
            } else if (s2_msps == 0) {
                s2_msps = 1
            }
        }
        let c2_steps = Math.round(t2_ms / s2_msps)
        if (c2_steps < 0) {
            c2_steps = 0
        }
        let c1_steps = Math.round((ca_steps - c2_steps) / 2)
        if (c1_steps < 0) {
            c1_steps = 0
        }
        c2_steps = ca_steps - c1_steps * 2
        step_run = 0
        stepRotateMotorAcc(dir, c1_steps, s1_msps, s2_msps)
        stepRotateMotor(dir, c2_steps, s2_msps)
        stepRotateMotorAcc(dir, c1_steps, s2_msps, s1_msps)
    }

    let degpstep = 7.5
    let steppround = 48
    //% blockId=step_set_degpstep block="S: set %deg deg/step"
    //% group="STEPPER units"
    //% deg.defl=0
    export function setDegPerStep(deg: number) {
        degpstep = deg
        steppround = Math.round(360.0 / degpstep)
    }

    //% blockId=step_set_stepspround block="S: set %steps steps/round"
    //% group="STEPPER units"
    //% steps.defl=0
    export function setStepsPerRound(steps: number) {
        steppround = steps
        degpstep = 360.0 / steppround
    }

    let mmpstep = 0.1
    //% blockId=step_set_mmpstep block="S: set %mm mm/step"
    //% group="STEPPER units"
    //% mm.defl=0
    export function setMMPerStep(mm: number) {
        mmpstep = mm
    }

    //% blockId=step_freq2mspstep block="S: %freq Hz to ms/step"
    //% group="STEPPER to ms/step"
    //% freq.defl=0
    //% freq.min=1 freq.max=1000
    export function freq2mspstep(freq: number): number {
        let ms = 1000 / freq
        if (ms < 1) {
            ms = 1
        }
        return Math.round(ms)
    }

    //% blockId=step_rpm2mspstep block="S: %rpm rpm to ms/step"
    //% group="STEPPER to ms/step"
    //% rpm.defl=0
    //% rpm.min=60 rpm.max=60000
    export function rpm2mspstep(rpm: number): number {
        return freq2mspstep(rpm / 60)
    }

    //% blockId=step_rounds2steps block="S: %rounds rounds to steps"
    //% group="STEPPER to steps"
    //% rounds.defl=0
    export function rounds2Steps(rounds: number): number {
        return Math.round(rounds * steppround * (step_drv_mode == StepDriveMode.STP_DRV_1_1 ? 1 : 2))
    }

    //% blockId=step_deg2steps block="S: %deg degree to steps"
    //% group="STEPPER to steps"
    //% deg.defl=0
    export function deg2Steps(deg: number): number {
        return Math.round((deg / degpstep) * (step_drv_mode == StepDriveMode.STP_DRV_1_1 ? 1 : 2))
    }

    //% blockId=step_mm2steps block="S: %mm mm to steps"
    //% group="STEPPER to steps"
    //% mm.defl=0
    export function mm2Steps(mm: number): number {
        return Math.round((mm / mmpstep) * (step_drv_mode == StepDriveMode.STP_DRV_1_1 ? 1 : 2))
    }

}
