import { jest } from "@jest/globals";
import voucherService from "services/voucherService";
import voucherRepository from "repositories/voucherRepository";

describe("Apply Voucher", () => {
  it("Apply nonexistent voucer", async () => {
    jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((): any => {
      return false;
    });

    const promise = voucherService.applyVoucher("CODE10", 100);
    expect(promise).rejects.toEqual({message: "Voucher does not exist.", type: "conflict"});
  });

});