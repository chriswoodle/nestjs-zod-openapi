import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { extendApi, extendZodWithOpenApi } from '@anatine/zod-openapi';
import { ZodValidationPipe, createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod'

extendZodWithOpenApi(z, true);

function buildOpenAPiRefPath(name: string) {
    return {
        $ref: `#/components/schemas/${name}`
    }
}

const CredentialsSchema = extendApi(z.object({
    username: z.string().describe('This is an username'),
    password: z.string().describe('This is a password'),
}))
class CredentialsSchemaDto extends createZodDto(CredentialsSchema) { }
CredentialsSchema.openapi(buildOpenAPiRefPath(CredentialsSchemaDto.name))

const UserSchema = extendApi(z.object({
    id: z.string(),
}))
class UserSchemaDto extends createZodDto(UserSchema) { }
UserSchema.openapi(buildOpenAPiRefPath(UserSchemaDto.name))

const ExtendedCredentialsSchema = extendApi(z.object({
    credentials: CredentialsSchema,
    user: UserSchema,
}))
class ExtendedCredentialsSchemaDto extends createZodDto(ExtendedCredentialsSchema) { }

@Controller()
@UsePipes(ZodValidationPipe)
@ApiExtraModels(CredentialsSchemaDto)
@ApiExtraModels(UserSchemaDto)
export class AppController {
    constructor() { }

    @Post('hello')
    hello(@Body() body: CredentialsSchemaDto) {
        return;
    }

    @Post('world')
    world(@Body() body: ExtendedCredentialsSchemaDto) {
        return;
    }
}
