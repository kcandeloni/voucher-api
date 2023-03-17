import { jest } from "@jest/globals";
import voucherService from "services/voucherService";
import voucherRepository from "repositories/voucherRepository";

const params = {code:"CODE10", amount: 100, valueRejected: 90, discont: 10};

describe("Apply Voucher", () => {
  it("Voucher applied successfully", async () => {
    jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code): any => {
      return {
        id: 1,
        code: code,
        discount: params.discont,
        used: false
      };
    });

    jest
    .spyOn(voucherRepository, "useVoucher")
    .mockImplementationOnce((): any => {
      return;
    });

    const promise = await voucherService.applyVoucher(params.code, params.amount);
    
    expect(promise).toEqual({
      amount: params.amount,
      discount: params.discont,
      finalAmount: params.amount - (params.amount * (params.discont / 100)),
      applied: true
    });
  });
  
});

describe("Reject voucher", () => {
  
  it("Non-existent voucher", async () => {
    jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((): any => {
      return false;
    });

    const promise = voucherService.applyVoucher("CODE10", 100);
    expect(promise).rejects.toEqual({message: "Voucher does not exist.", type: "conflict"});
  });
  
  it("Minimum amount for discount not reached", async () => {
    jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code): any => {
      return {
        id: 1,
        code: code,
        discount: params.discont,
        used: false
      };
    });

    jest
    .spyOn(voucherRepository, "useVoucher")
    .mockImplementationOnce((): any => {
      return;
    });

    const promise = await voucherService.applyVoucher(params.code, params.valueRejected);
    
    expect(promise).toEqual({
      amount: params.valueRejected,
      discount: params.discont,
      finalAmount: params.valueRejected,
      applied: false
    });
  });
  
  it("Voucher already used", async () => {
    jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code): any => {
      return {
        id: 1,
        code: code,
        discount: params.discont,
        used: true
      };
    });

    jest
    .spyOn(voucherRepository, "useVoucher")
    .mockImplementationOnce((): any => {
      return;
    });

    const promise = await voucherService.applyVoucher(params.code, params.amount);
    
    expect(promise).toEqual({
      amount: params.amount,
      discount: params.discont,
      finalAmount: params.amount,
      applied: false
    });
  });
  
});