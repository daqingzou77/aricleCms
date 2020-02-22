import tools from '../utils/tools';

export default (req, res, next) => {
    res.tools = new tools(req, res);
    next()
}  