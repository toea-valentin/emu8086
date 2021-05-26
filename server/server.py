from __future__ import print_function
import copy
import array
from unicorn import *
from unicorn.x86_const import *
from keystone import *
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='../build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

code = b"inc eax"


class Engine:
    def __init__(this):
        this.mu = Uc(UC_ARCH_X86, UC_MODE_32)
        this.registers = [
            {'name': "EAX", 'value': 0},
            {'name': "EBX", 'value': 0},
            {'name': "ECX", 'value': 0},
            {'name': "EDX", 'value': 0},
            {'name': "EBP", 'value': 0},
            {'name': "ESP", 'value': 0},
            {'name': "ESI", 'value': 0},
            {'name': "EDI", 'value': 0},
        ]

        this.flags = [
            {'name': "OF", 'value': 0},
            {'name': "DF", 'value': 0},
            {'name': "IF", 'value': 0},
            {'name': "TF", 'value': 0},
            {'name': "SF", 'value': 0},
            {'name': "ZF", 'value': 0},
            {'name': "AF", 'value': 0},
            {'name': "PF", 'value': 0},
            {'name': "CF", 'value': 0},
        ]

        this.steps = []
        this.flagSteps = []
        this.instructions = b''

    def assemble_code(this, code):
        # convert the code to binary instructions
        try:
            ks = Ks(KS_ARCH_X86, KS_MODE_32)
            encoding, count = ks.asm(code)
            this.instructions = encoding
        except KsError as e:
            print("ERROR: %s" % e)

        this.instructions = array.array('B', encoding).tobytes()

    def start_emulation(this, code):
        # assemble code
        this.assemble_code(code)

        # init the memory
        ADDRESS = 0x1000000
        this.mu.mem_map(ADDRESS, 2 * 1024 * 1024)
        this.mu.mem_write(ADDRESS, this.instructions)

        # hook every program step to fucntion hook_code
        this.mu.hook_add(UC_HOOK_CODE, this.hook_code)

        # start the emulation
        this.mu.emu_start(ADDRESS, ADDRESS + len(this.instructions))

        # update the registers after the emulation ended
        r_eax = this.mu.reg_read(UC_X86_REG_EAX)
        r_ebx = this.mu.reg_read(UC_X86_REG_EBX)
        r_ecx = this.mu.reg_read(UC_X86_REG_ECX)
        r_edx = this.mu.reg_read(UC_X86_REG_EDX)
        r_ebp = this.mu.reg_read(UC_X86_REG_EBP)
        r_esp = this.mu.reg_read(UC_X86_REG_ESP)
        r_esi = this.mu.reg_read(UC_X86_REG_ESI)
        r_edi = this.mu.reg_read(UC_X86_REG_EDI)
    
        lst = [r_eax, r_ebx, r_ecx, r_edx, r_ebp, r_esp, r_esi, r_edi]
        this.update_registers(lst)

        eflags = this.mu.reg_read(UC_X86_REG_EFLAGS)
        this.update_flags(eflags)

    def get_registers(this):
        return this.registers

    def get_steps(this):
        return this.steps

    def get_flags(this):
        return this.flags

    def get_flags_steps(this):
        return this.flagSteps

    def update_registers(this, registers_list):
        for index, reg in enumerate(registers_list):
            this.registers[index]['value'] = to_32bit(reg)

        this.steps.append(copy.deepcopy(this.registers))

    def update_flags(this, flagsValue):
        flagsBin = bin(flagsValue)
        flags = f"{flagsValue:#016b}"
        flags = flags[::-1]
        # print(flagsString)

        this.flags = [
            {'name': "OF", 'value': flags[11]},
            {'name': "DF", 'value': flags[10]},
            {'name': "IF", 'value': flags[9]},
            {'name': "TF", 'value': flags[8]},
            {'name': "SF", 'value': flags[7]},
            {'name': "ZF", 'value': flags[6]},
            {'name': "AF", 'value': flags[4]},
            {'name': "PF", 'value': flags[2]},
            {'name': "CF", 'value': flags[0]},
        ]

        this.flagSteps.append(copy.deepcopy(this.flags))

    def hook_code(this, uc, address, size, user_data):
        # update the flags at every step
        eflags = uc.reg_read(UC_X86_REG_EFLAGS)
        this.update_flags(eflags)

        # update the registers at every step
        r_eax = uc.reg_read(UC_X86_REG_EAX)
        r_ebx = uc.reg_read(UC_X86_REG_EBX)
        r_ecx = uc.reg_read(UC_X86_REG_ECX)
        r_edx = uc.reg_read(UC_X86_REG_EDX)
        r_ebp = uc.reg_read(UC_X86_REG_EBP)
        r_esp = uc.reg_read(UC_X86_REG_ESP)
        r_esi = uc.reg_read(UC_X86_REG_ESI)
        r_edi = uc.reg_read(UC_X86_REG_EDI)

        lst = [r_eax, r_ebx, r_ecx, r_edx, r_ebp, r_esp, r_esi, r_edi]
        this.update_registers(lst)


def to_32bit(value):
    if value >= 0x80000000:
        value -= 0x100000000
    return value

#get method to pass the results to the front-end
@app.route('/get')
@cross_origin()
def get_current_time():
    global code
    eng = Engine()
    eng.start_emulation(code)

    result1 = eng.get_registers()
    result2 = eng.get_steps()
    result3 = eng.get_flags()
    result4 = eng.get_flags_steps()
    return jsonify({'registers': result1, 'steps': result2, 'flags': result3, 'flagsSteps': result4})

#post method to receive the code text from the front-end
@app.route('/post', methods=['POST', 'GET'])
@cross_origin()
def post_test():
    if request.method == 'POST':
        req = request.json
        new_code = req['code']
        global code
        code = new_code
        return "done"


@app.route('/')
def index():
    return app.send_static_file('index.html')