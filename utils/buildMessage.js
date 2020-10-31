function buildMessage(entity, action) {
    if  (action === 'list') {
        return `${entity}s ${action}ed`
    }
    else if (action === 'create') {
        return `${entity} ${action}d`
    }
    return `${entity} ${action}`
}

module.exports = buildMessage