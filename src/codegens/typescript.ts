import { Schema } from "@open-rpc/meta-schema";
import { CodeGen } from "./codegen-interface";
import traverse from "../traverse";

export default class Typescript extends CodeGen {
  public getTypesForSchema(schema: Schema): string {
    let prefix = "";
    let typing = "";

    switch (schema.type) {
      case "boolean":
        prefix = "type";
        typing = "boolean";
        break;
      case "null":
        prefix = "type";
        typing = "null";
        break;
      case "number":
      case "integer":
        prefix = "type";
        typing = "number";
        if (schema.enum) { typing = this.handleEnum(schema); }
        break;
      case "string":
        prefix = "type";
        typing = "string";
        if (schema.enum) { typing = this.handleEnum(schema); }
        break;
      case "array":
        prefix = "type";
        let typedArray = "";
        let tupleItems = "";
        if (schema.items instanceof Array) {
          tupleItems = this.getJoinedTitles(schema.items);
        } else if (schema.items !== undefined) {
          typedArray = this.refToName(schema.items);
        } else {
          typedArray = "any";
        }
        typing = `${typedArray}[${tupleItems}]`;
        break;
      case "object":
        prefix = "interface";
        if (schema.properties === undefined) {
          typing = "{ [key: string]: any }";
          break;
        }
        const propertyTypings = Object.keys(schema.properties).reduce((typings: string[], key: string) => {
          return [...typings, `  ${key}: ${this.refToName(schema.properties[key])};`];
        }, []);
        typing = [`{`, ...propertyTypings, "}"].join("\n");
        break;
      default:
        if (schema.anyOf || schema.oneOf) {
          prefix = "type";
          const schemas = schema.anyOf === undefined ? schema.oneOf : schema.anyOf;
          typing = this.getJoinedTitles(schemas, " | ");
        } else if (schema.allOf) {
          prefix = "type";
          typing = this.getJoinedTitles(schema.allOf, " & ");
        } else {
          prefix = "type";
          typing = "any";
        }
        break;
    }

    return [
      `export ${prefix} ${schema.title}`,
      prefix === "type" ? " = " : " ",
      typing,
      prefix === "type" ? ";" : "",
    ].join("");
  }

  private handleEnum(schema: Schema): string {
    const typeOf = schema.type === "string" ? "string" : "number";
    return schema.enum
      .filter((s: any) => typeof s === typeOf)
      .map((s: string) => typeOf === "string" ? `"${s}"` : s)
      .join(" | ");
  }
}