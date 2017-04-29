function func(input) {
  var str = input;

  var pos = 0;
  var cntIs = 0;
  while(true) {
    if (/^is$/.test(str)) {
      cntIs++;
      str = str.replace(/^is$/, "aisa");
    } else if (/^is(\s+)/.test(str)) {
      cntIs++;
      str = str.replace(/^is(\s+)/, "aisa$1");
    } else if (/(\s+)is(\s+)/.test(str)) {
      cntIs++;
      str = str.replace(/(\s+)is(\s+)/, "$1aisa$2");
    } else if (/(\s+)is$/.test(str)) {
      cntIs++;
      str = str.replace(/(\s+)is$/, "$1aisa");
    } else {
      break;
    }

  }

  var cntThis = 0;
  while(true) {
    if (/^this$/.test(str)) {
      cntThis++;
      str = str.replace(/^this$/, "athisa");
    } else if (/^this(\s+)/.test(str)) {
      cntThis++;
      str = str.replace(/^this(\s+)/, "athisa$1");
    } else if (/(\s+)this(\s+)/.test(str)) {
      cntThis++;
      str = str.replace(/(\s+)this(\s+)/, "$1athisa$2");
    } else if (/(\s+)this$/.test(str)) {
      cntThis++;
      str = str.replace(/(\s+)this$/, "$1athisa");
    } else {
      break;
    }
  }

  var cntJs = 0;
  while(true) {
    if (/^javascript$/.test(str)) {
      cntJs++;
      str = str.replace(/^javascript$/, "ajavascripta");
    } else if (/^javascript(\s+)/.test(str)) {
      cntJs++;
      str = str.replace(/^javascript(\s+)/, "ajavascripta$1");
    } else if (/(\s+)javascript(\s+)/.test(str)) {
      cntJs++;
      str = str.replace(/(\s+)javascript(\s+)/, "$1ajavascripta$2");
    } else if (/(\s+)javascript$/.test(str)) {
      cntJs++;
      str = str.replace(/(\s+)javascript$/, "$1ajavascripta");
    } else {
      break;
    }
  }

  if (cntIs > 1) {
    while (input.search(/(\s+)(is)$/) != -1) {
      cntIs--;
      input = input.replace(/(\s+)(is)$/, "$1a$2a");
    }

    while(input.search(/(\s+)(is)(\s+)/) != -1) {
      cntIs--;
      input = input.replace(/(\s+)(is)(\s+)/, "$1a$2a$3");
    }

    while(input.search(/^(is)(\s+)/) != -1) {
      cntIs--;
      input = input.replace(/^(is)(\s+)/, "a$1a$2");
    }
  }

  if (cntThis > 1) {
    while (input.search(/(\s+)(this)$/) != -1) {
      cntThis--;
      input = input.replace(/(\s+)(this)$/, "$1a$2a");
    }

    while(input.search(/(\s+)(this)(\s+)/) != -1) {
      cntThis--;
      input = input.replace(/(\s+)(this)(\s+)/, "$1a$2a$3");
    }

    while(input.search(/^(this)(\s+)/) != -1) {
      cntThis--;
      input = input.replace(/^(this)(\s+)/, "a$1a$2");
    }
  }

  if (cntJs > 1) {
    while (input.search(/(\s+)(javascript)$/) != -1) {
      cntJs--;
      input = input.replace(/(\s+)(javascript)$/, "$1a$2a");
    }

    while(input.search(/(\s+)(javascript)(\s+)/) != -1) {
      cntJs--;
      input = input.replace(/(\s+)(javascript)(\s+)/, "$1a$2a$3");
    }

    while(input.search(/^(javascript)(\s+)/) != -1) {
      cntJs--;
      input = input.replace(/^(javascript)(\s+)/, "a$1a$2");
    }
  }

  return input;
}