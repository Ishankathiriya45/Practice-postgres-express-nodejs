const constants = require("../constants");

const isEmpty = (value) => {
  if (value === undefined || value === null) return true;

  if (typeof value === "string") {
    return ["", "null", "undefine", "0", "NaN"].includes(value.trim());
  }

  if (Array.isArray(value) || typeof value === "object") {
    return Object.keys(value).length === 0;
  }
};

module.exports = {
  isEmpty,
  fetchRecord: async (
    model,
    options = {},
    paginate = false,
    unscoped = false
  ) => {
    let currentPage = 1,
      pageSize = 10;
    let queryMethod = unscoped ? model.unscoped() : model;

    let rows = [];
    if (paginate == true) {
      currentPage = parseInt(options.currentPage) || 1;
      pageSize = parseInt(options.pageSize) || 10;

      const offset = (currentPage - 1) * pageSize;
      options.offset = offset;
      options.limit = pageSize;
      delete options.currentPage;
      delete options.pageSize;
      delete options.is_paginate;
      rows = await queryMethod.findAll(options);
    } else {
      return await queryMethod.findAll(options);
    }

    const countOptions = { ...options };
    delete countOptions.limit;
    delete countOptions.offset;
    let count = await queryMethod.count(countOptions);
    let totalPages = Math.ceil(count / options.limit);

    return {
      totalItems: count,
      totalPages,
      currentPage,
      hasPrevious: currentPage > 1,
      hasNext: currentPage < totalPages,
      previous: currentPage > 1 ? currentPage - 1 : null,
      next: currentPage < totalPages ? currentPage + 1 : null,
      rows,
    };
  },

  generateOtp: () => {
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  },

  getDynamicContent: (contentKey, messageData, contentResource) => {
    const resource = constants[contentResource];
    let content = resource[contentKey];
    if (content && messageData) {
      for (const key in messageData) {
        content = content.replaceAll(`[${key}]`, messageData[key]);
      }
    }
    return content;
  },

  capitalize: (str) =>
    str
      ? str.charAt(0).toUpperCase().trim() + str.slice(1).toLowerCase().trim()
      : null,
};
