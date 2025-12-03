export const defaultAdminEventNotifierFields = [
    "id",
    "event_name",
    "channel",
    "recipient_type",
    "recipient",

    "template_id",
    "template.*",

    "created_at",
    "updated_at",
    "deleted_at",
]

export const retrieveTransformQueryConfig = {
    defaults: defaultAdminEventNotifierFields,
    isList: false,
}

export const listTransformQueryConfig = {
    ...retrieveTransformQueryConfig,
    isList: true,
}
