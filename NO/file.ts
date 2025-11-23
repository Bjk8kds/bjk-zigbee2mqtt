    {
        fingerprint: tuya.fingerprint("TS0601", ["_TZE284_aai5grix", "_TZE204_aai5grix"]),
        model: "MTD285-ZB",
        vendor: "Wenzhi",
        description: "24GHz mmWave human presence sensor",
        extend: [tuya.modernExtend.tuyaBase({dp: true})],
        exposes: [
            e.presence(),
            e.enum("state", ea.STATE, ["none", "presence", "move"]).withDescription("Presence state"),
            e.illuminance().withDescription("Measured illuminance"),
            e
                .numeric("min_distance", ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(8.4)
                .withValueStep(0.1)
                .withUnit("m")
                .withDescription("Minimum detection distance"),
            e
                .numeric("max_distance", ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(8.4)
                .withValueStep(0.1)
                .withUnit("m")
                .withDescription("Maximum detection distance"),
            e.numeric("target_distance", ea.STATE).withValueMin(0).withValueMax(9.9).withUnit("m").withDescription("Target distance"),
            ...Array.from({length: 11}, (_, i) =>
                e
                    .enum(`gate_enable_${String(i + 1).padStart(2, "0")}`, ea.STATE_SET, ["disable", "enable"])
                    .withDescription(`Distance gate ${i + 1} enable`),
            ),
            e.numeric("configuration_gate", ea.STATE_SET).withValueMin(1).withValueMax(11).withDescription("Select gate for threshold config"),
            e.numeric("move_threshold", ea.STATE_SET).withValueMin(0).withValueMax(99).withDescription("Configure motion detection threshold"),
            e.numeric("presence_threshold", ea.STATE_SET).withValueMin(0).withValueMax(99).withDescription("Configure presence detection threshold"),
            e.numeric("nearest_target_gate", ea.STATE).withValueMin(0).withValueMax(11).withDescription("Nearest active gate"),
            e
                .numeric("target_countdown", ea.STATE)
                .withValueMin(0)
                .withValueMax(3600)
                .withUnit("s")
                .withDescription("Target timeout countdown (debug only)"),
            e
                .numeric("target_velocity", ea.STATE)
                .withValueMin(-9.99)
                .withValueMax(9.99)
                .withUnit("m/s")
                .withDescription("Target speed with direction"),
            e.enum("debug_switch", ea.STATE_SET, ["off", "on"]).withDescription("Debug mode toggle"),
            e
                .enum("led_mode", ea.STATE_SET, ["silence", "status"]) // same as in the app
                .withDescription("LED indicator mode"),
            e.numeric("delay_time", ea.STATE_SET).withValueMin(5).withValueMax(3600).withUnit("s").withDescription("Departure delay time"),
            e
                .numeric("block_time", ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(10)
                .withValueStep(0.5)
                .withUnit("s")
                .withDescription("Block time after unoccupancy"), // same as in the app
            e
                .enum("judge_logic", ea.STATE_SET, ["large_move", "small_move", "custom_move"]) // same as in the app
                .withDescription("Presence detection algorithm"),
            e
                .enum("environmental_noise_collect", ea.STATE_SET, ["start", "ongoing", "complete"])
                .withDescription("Environmental background noise collection status"),
            e.enum("device_control", ea.STATE_SET, ["no_action", "restart", "reset_param"]).withDescription("Device control commands"),
            e.enum("presence_sensitivity", ea.STATE_SET, ["high", "medium", "low", "custom"]).withDescription("Presence sensitivity"),
            e.enum("move_sensitivity", ea.STATE_SET, ["high", "medium", "low", "custom"]).withDescription("Motion sensitivity"),
            e
                .enum("scene_mode", ea.STATE_SET, [
                    "custom", // more fitting and same as in the app
                    "toilet",
                    "kitchen",
                    "corridor",
                    "bedroom",
                    "living_room",
                    "meeting_room", // same as in the app
                ])
                .withDescription("Scene mode preset"),
            e.binary("illuminance_report", ea.STATE_SET, "on", "off").withDescription("Illuminance reporting toggle"),
            e.binary("move_detect", ea.STATE_SET, "on", "off").withDescription("Motion detection toggle"),
            e.binary("distance_report", ea.STATE_SET, "on", "off").withDescription("Distance reporting toggle"),
            e.binary("speed_report", ea.STATE_SET, "on", "off").withDescription("Speed reporting toggle"),
        ],
        meta: {
            tuyaDatapoints: [
                [
                    1,
                    null,
                    {
                        from: (v: number) => ({
                            presence: v !== 0,
                            state: v === 0 ? "none" : v === 1 ? "presence" : "move",
                        }),
                    },
                ],
                [3, "min_distance", tuya.valueConverter.divideBy10],
                [4, "max_distance", tuya.valueConverter.divideBy10],
                [9, "target_distance", tuya.valueConverter.divideBy10],
                [101, "gate_enable_01", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [102, "gate_enable_02", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [103, "gate_enable_03", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [104, "gate_enable_04", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [105, "gate_enable_05", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [106, "gate_enable_06", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [107, "gate_enable_07", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [108, "gate_enable_08", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [109, "gate_enable_09", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [110, "gate_enable_10", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [111, "gate_enable_11", tuya.valueConverterBasic.lookup({disable: tuya.enum(0), enable: tuya.enum(1)})],
                [112, "configuration_gate", tuya.valueConverter.raw],
                [113, "move_threshold", tuya.valueConverter.raw],
                [114, "presence_threshold", tuya.valueConverter.raw],
                [115, "nearest_target_gate", tuya.valueConverter.raw],
                [116, "target_countdown", tuya.valueConverter.raw],
                [117, "target_velocity", tuya.valueConverter.divideBy100],
                [118, "debug_switch", tuya.valueConverterBasic.lookup({off: tuya.enum(0), on: tuya.enum(1)})],
                [119, "led_mode", tuya.valueConverterBasic.lookup({silence: tuya.enum(0), status: tuya.enum(1)})],
                [120, "delay_time", tuya.valueConverter.raw],
                [121, "block_time", tuya.valueConverter.divideBy10],
                [
                    122,
                    "judge_logic",
                    tuya.valueConverterBasic.lookup({large_move: tuya.enum(0), small_move: tuya.enum(1), custom_move: tuya.enum(2)}),
                ],
                [
                    123,
                    "environmental_noise_collect",
                    tuya.valueConverterBasic.lookup({start: tuya.enum(0), ongoing: tuya.enum(1), complete: tuya.enum(2)}),
                ],
                [124, "device_control", tuya.valueConverterBasic.lookup({no_action: tuya.enum(0), restart: tuya.enum(1), reset_param: tuya.enum(2)})],
                [125, "illuminance", tuya.valueConverter.raw],
                [
                    126,
                    "presence_sensitivity",
                    tuya.valueConverterBasic.lookup({high: tuya.enum(0), medium: tuya.enum(1), low: tuya.enum(2), custom: tuya.enum(3)}),
                ],
                [
                    127,
                    "move_sensitivity",
                    tuya.valueConverterBasic.lookup({high: tuya.enum(0), medium: tuya.enum(1), low: tuya.enum(2), custom: tuya.enum(3)}),
                ],
                [
                    128,
                    "scene_mode",
                    tuya.valueConverterBasic.lookup({
                        custom: tuya.enum(0), // more fitting and same as in the app
                        toilet: tuya.enum(1),
                        kitchen: tuya.enum(2),
                        corridor: tuya.enum(3),
                        bedroom: tuya.enum(4),
                        living_room: tuya.enum(5),
                        meeting_room: tuya.enum(6), // same as in the app
                    }),
                ],
                [129, "illuminance_report", tuya.valueConverterBasic.lookup({off: tuya.enum(0), on: tuya.enum(1)})],
                [130, "move_detect", tuya.valueConverterBasic.lookup({off: tuya.enum(0), on: tuya.enum(1)})],
                [131, "distance_report", tuya.valueConverterBasic.lookup({off: tuya.enum(0), on: tuya.enum(1)})],
                [132, "speed_report", tuya.valueConverterBasic.lookup({off: tuya.enum(0), on: tuya.enum(1)})],
            ],
        },
    },
