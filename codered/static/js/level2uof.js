const _0x4d7a31 = _0x5a1c; function _0x4267() { const _0x338d5f = ['offsetWidth', 'mousemove', 'substr', 'closer', 'add', 'random', '1230858LrFUpF', 'classList', 'hint:\x20Warmer\x20and\x20colder', 'nearest', 'innerHeight', '.word', 'Click\x20the\x20button\x20to\x20move\x20on\x20to\x20the\x20next\x20level', '1055604BJqcbI', 'offsetHeight', 'ready', 'innerWidth', 'sqrt', '4585525Axdmla', 'top', 'addEventListener', 'pow', 'Move\x20the\x20button\x20to\x20\x20x\x20=\x20', '74345TNftJD', 'left', 'You\x20win!', 'near', 'length', 'clientX', 'text', '5uPbKZe', 'button', 'remove', 'style', '17496DjYean', '11889TltwVf', '2580963mRhPyH', '476092SJUHeB']; _0x4267 = function () { return _0x338d5f; }; return _0x4267(); } (function (_0x4cca4d, _0x3e551a) { const _0x14dbed = _0x5a1c, _0x21a2de = _0x4cca4d(); while (!![]) { try { const _0x2e73de = parseInt(_0x14dbed(0x198)) / 0x1 + -parseInt(_0x14dbed(0x187)) / 0x2 + -parseInt(_0x14dbed(0x1a5)) / 0x3 + -parseInt(_0x14dbed(0x1a6)) / 0x4 * (parseInt(_0x14dbed(0x19f)) / 0x5) + -parseInt(_0x14dbed(0x18e)) / 0x6 + -parseInt(_0x14dbed(0x193)) / 0x7 + -parseInt(_0x14dbed(0x1a3)) / 0x8 * (-parseInt(_0x14dbed(0x1a4)) / 0x9); if (_0x2e73de === _0x3e551a) break; else _0x21a2de['push'](_0x21a2de['shift']()); } catch (_0x6b8e7) { _0x21a2de['push'](_0x21a2de['shift']()); } } }(_0x4267, 0x833f6)); function _0x5a1c(_0x12ce0f, _0x50d584) { const _0x426761 = _0x4267(); return _0x5a1c = function (_0x5a1c8d, _0x70c231) { _0x5a1c8d = _0x5a1c8d - 0x187; let _0x3f9db2 = _0x426761[_0x5a1c8d]; return _0x3f9db2; }, _0x5a1c(_0x12ce0f, _0x50d584); } const button = document['getElementById'](_0x4d7a31(0x1a0)), screenWidth = window[_0x4d7a31(0x191)], screenHeight = window[_0x4d7a31(0x18b)]; var gspot = Math[_0x4d7a31(0x1ac)]() * 0x1f4; gspot = Math['round'](gspot), console['log'](_0x4d7a31(0x197), gspot), button[_0x4d7a31(0x195)](_0x4d7a31(0x1a8), _0x2b5948 => { const _0x5e9386 = _0x4d7a31, _0x2f93f4 = parseInt(button[_0x5e9386(0x1a2)][_0x5e9386(0x199)], 0xa), _0x9b7a9f = parseInt(button[_0x5e9386(0x1a2)][_0x5e9386(0x194)], 0xa); let _0x3d2c7f = _0x2b5948['clientY'], _0x3da54e = _0x2b5948[_0x5e9386(0x19d)]; if (_0x3d2c7f < 0x0) _0x3d2c7f = 0x0; else _0x3d2c7f + button[_0x5e9386(0x18f)] > screenHeight && (_0x3d2c7f = screenHeight - button['offsetHeight']); if (_0x3da54e < 0x0) _0x3da54e = 0x0; else _0x3da54e + button['offsetWidth'] > screenWidth && (_0x3da54e = screenWidth - button[_0x5e9386(0x1a7)]); const _0x5d831e = Math[_0x5e9386(0x192)](Math[_0x5e9386(0x196)](_0x2f93f4 - gspot, 0x2) + Math['pow'](_0x2f93f4 - gspot, 0x2)); if (_0x2f93f4 !== gspot && _0x9b7a9f !== gspot) { const _0x27e3cb = window[_0x5e9386(0x191)], _0x36879c = window[_0x5e9386(0x18b)], _0x11468f = Math['random']() * _0x27e3cb, _0x2fb379 = Math[_0x5e9386(0x1ac)]() * _0x36879c; button['style'][_0x5e9386(0x199)] = _0x11468f + 'px', button['style'][_0x5e9386(0x194)] = _0x2fb379 + 'px'; } else console['log'](_0x5e9386(0x19a)); if (_0x5d831e < 0x64) button[_0x5e9386(0x188)][_0x5e9386(0x1ab)](_0x5e9386(0x18a)); else { if (_0x5d831e < 0xfa) button[_0x5e9386(0x188)]['add'](_0x5e9386(0x19b)); else _0x5d831e < 0x15e ? button[_0x5e9386(0x188)][_0x5e9386(0x1ab)](_0x5e9386(0x1aa)) : (button[_0x5e9386(0x188)]['remove'](_0x5e9386(0x18a)), button['classList'][_0x5e9386(0x1a1)](_0x5e9386(0x19b)), button['classList']['remove'](_0x5e9386(0x1aa))); } }); var words = [_0x4d7a31(0x18d), _0x4d7a31(0x189)], part, level2_i = 0x0, offset = 0x0, len = words[_0x4d7a31(0x19c)], forwards = !![], skip_count = 0x0, skip_delay = 0xf, speed = 0x46, wordflick = function () { setInterval(function () { const _0x59de6f = _0x5a1c; forwards ? offset >= words[level2_i][_0x59de6f(0x19c)] && (++skip_count, skip_count == skip_delay && (forwards = ![], skip_count = 0x0)) : offset == 0x0 && (forwards = !![], level2_i++, offset = 0x0, level2_i >= len && (level2_i = 0x0)), part = words[level2_i][_0x59de6f(0x1a9)](0x0, offset), skip_count == 0x0 && (forwards ? offset++ : offset--), $(_0x59de6f(0x18c))[_0x59de6f(0x19e)](part); }, speed); }; $(document)[_0x4d7a31(0x190)](function () { wordflick(); });