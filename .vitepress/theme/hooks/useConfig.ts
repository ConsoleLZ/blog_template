// @ts-ignore
import config from "/config.yml?raw"
// @ts-ignore
import YAML from "yaml"
import {type ConfigType} from "../types/configType";

export function useConfig():ConfigType{
    return YAML.parse(config)
}