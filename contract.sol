pragma solidity ^0.4.1;

contract PatientRecord{
    event NewIssuer(
        address newOne,
        address issuer,
        uint id
        );
    
    struct patient{
        uint bsn;
        address issuer;
        uint gender;
        uint age;
        string info;
        mapping(address => bool) trustees;
    }
    
    struct healthcareProvider{
        uint id;
        address issuer;
        uint Type;
    }
    
    struct insuranceProvider{
        uint id;
        address owner;
        address issuer;
    }
    
    mapping (address => patient) patients;
    uint public numPatient;
    
    mapping (address => healthcareProvider) hps;
    uint public numHps;
    
    mapping (address => insuranceProvider) ips;
    uint public numIps;
    
    address[] public issuers;
    uint public numIssuer;
    
    function PatientRecord(address _issuer){
        numPatient = 0;
        issuers.push(_issuer);
        numIssuer = 1;
        numHps = 0;
        numIps = 0;
    }
    
    function isIssuer(address adr) constant returns (bool){
        for (uint i = 0; i < numIssuer; i++) {
            if (issuers[i] == adr) return true;
            else return false;
        }
    }
    
    function issuePatient (address _owner, uint _id, uint _age, uint _gender) {
        if (!isIssuer(tx.origin)) throw;
        patients[_owner].bsn = _id;
        patients[_owner].issuer = tx.origin;
        patients[_owner].age = _age;
        patients[_owner].gender = _gender;
    }
    
    function issueHP (address _owner, uint _id, uint _Type) {
        if (!isIssuer(tx.origin)) throw;
        hps[_owner].id = _id;
        hps[_owner].issuer = tx.origin;
        hps[_owner].Type = _Type;
    }
    
    function issueIP (address _owner, uint _id){
        if (!isIssuer(tx.origin)) throw;
        ips[_owner].issuer = tx.origin;
        ips[_owner].id = _id;
    }
    
    function setInfo (string _info) {
        if (!isIssuer(patients[tx.origin].issuer)) throw;
        patients[tx.origin].info = _info;
    }
    
    uint data;
    function setData (uint d){
        data = d;
    }
    
    
    function readIssuer (address user) constant returns (address){
        if (isIssuer(patients[user].issuer)) 
        return patients[user].issuer;
        if (isIssuer(hps[user].issuer)) 
        return hps[user].issuer;
        if (isIssuer(ips[user].issuer)) 
        return ips[user].issuer;
    }
    
    function readID (address patient) constant returns (string, uint, uint, uint,address){
        return (patients[patient].info, patients[patient].bsn, patients[patient].gender,patients[patient].age,patients[patient].issuer);
    }
    
    function readIns (address _insPr) constant returns (uint){
        return (ips[_insPr].id);
    }
    
    function readHc (address _hcPr) constant returns (uint, uint){
        return (hps[_hcPr].id, hps[_hcPr].Type);
    }
    
    function newIssuer (address _issuer) {
        if (tx.origin != issuers[0]) throw;
        issuers.push(_issuer);
        numIssuer++;
        NewIssuer(_issuer,tx.origin,numIssuer);
    }
    
    
    function setTrustee (address _trustee){
        patients[tx.origin].trustees[_trustee] = true;
    }

    function checkTrustee (address _patient, address _trustee) constant returns (bool){
        return patients[_patient].trustees[_trustee];
    }
    
    
}

contract AbstractPatientRecord{
    function readHc (address _hcPr) constant returns (uint, uint){
    }
    function readID (address patient) constant returns (string, uint, uint, uint,address){
    }
    function readIns (address _insPr) constant returns (uint){
    }
    function checkTrustee (address _patient, address _trustee) constant returns (bool){
    }
}

contract Policy1 is AbstractPatientRecord{
    
    address provider;
    address owner;
    mapping (uint => uint) balance;
    
    struct Claim{
        address healthcareProvider;
        uint[] amount;
        bool patientSig;
        bool paid;
        uint[] item;  
    }
    Claim[10] claims;
    uint numClm;
    
    function SetOwner(address _owner, address _pr){
        AbstractPatientRecord pr = AbstractPatientRecord(_pr);
        var (res1,res2,res3,res4,res5) = pr.readID(_owner);
        if (res2 == 0) throw;
        if (tx.origin != provider) throw;
        owner = _owner;
    }
    
    function ReadProvider() constant returns (address){
        return provider;
    }
    
    function ReadOwner() constant returns (address){
        return owner;
    }
    
    function Policy1(address _p){
       provider = _p;
       numClm = 0;
    }
    
    function SetBalance(uint _item, uint _balance) {
        if(tx.origin != provider) throw;
        balance[_item] = _balance;
    }
    
    function CheckBalance(uint _item, uint _amount) constant returns (bool){
        if (balance[_item] == 1) return true;
        if (balance[_item] - _amount > 0) return true;
        else return false;
    }
    
    function MakeClaim(address _pr, uint[] _amount, uint[] _item, uint num)returns (int) {
       AbstractPatientRecord pr = AbstractPatientRecord(_pr);
        var (re1,res2) = pr.readHc(msg.sender);
        if(res2 == 0) throw;
        var res = pr.readIns(provider);
        if(res == 0) throw;
        for (uint i = 0;i < num; i ++){
            if (!CheckBalance(_item[i],_amount[i]))
            return -1;
        }
        claims[numClm] = Claim({
            healthcareProvider:msg.sender,
            patientSig:false,
            paid:false,
            item:_item,
            amount:_amount
        });
        numClm++;
        return (int(numClm - 1));
    }
    
    function VerifyClaim(uint i) {
        if (tx.origin != owner) throw;
        claims[i].patientSig = true;
    }
    
    function DisplayClaims() constant returns (address[] memory providers, bool[] memory pttSigs, bool[] memory paidSigs){
        providers = new address[](numClm);
        pttSigs = new bool[](numClm);
        paidSigs = new bool[](numClm);
        for (uint i = 0; i <  numClm; i++){
            providers[i] = claims[i].healthcareProvider;
            pttSigs[i] = claims[i].patientSig;
            paidSigs[i] = claims[i].paid;
        }
    }
    
    function ClaimContent(uint i) constant returns (uint[],uint[]){
        return(claims[i].item, claims[i].amount);
    }
    
    function ClaimAudit(uint i) {
        if (tx.origin != provider) throw;
        if (claims[i].paid) throw;
        if (!claims[i].patientSig) throw;
        claims[i].paid = true;
    }
    
    
    
}