let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : '情报分析系统V0.1';
    window.document.title = title;
};

export default util;