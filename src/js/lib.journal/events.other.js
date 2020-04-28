// ./js/lib/events.other.js
const journal = require("../journal");

// Api manual chapter 11: Other Events
const AfmuRepairs = async function AfmuRepairs(line) {
  console.log(line);
};
const ApproachSettlement = async function ApproachSettlement(line) {
  return;
};
const ChangeCrewRole = async function ChangeCrewRole(line) {
  return;
};
const CockpitBreached = async function CockpitBreached(line) {
  console.log(line);
};
const CommitCrime = async function CommitCrime(line) {
  return;
};
const Continued = async function Continued(line) {
  console.log(line);
};
const CrewLaunchFighter = async function CrewLaunchFighter(line) {
  console.log(line);
};
const CrewMemberJoins = async function CrewMemberJoins(line) {
  return;
};
const CrewMemberQuits = async function CrewMemberQuits(line) {
  return;
};
const CrewMemberRoleChange = async function CrewMemberRoleChange(line) {
  console.log(line);
};
const CrimeVictim = async function CrimeVictim(line) {
  console.log(line);
};
const DatalinkScan = async function DatalinkScan(line) {
  return;
};
const DatalinkVoucher = async function DatalinkVoucher(line) {
  Cmdr.credits += line.Reward
  Cmdr.Save()
};
const DataScanned = async function DataScanned(line) {
  // Toast: candidate
  return;
};
const DockFighter = async function DockFighter(line) {
  console.log(line);
};
const DockSRV = async function DockSRV(line) {
  Cmdr.inSrv = false;
  
  let result = { callback: updateTravelState, data: line.event}
  return Promise.resolve(result)
};
const EndCrewSession = async function EndCrewSession(line) {
  return;
};
const FighterRebuilt = async function FighterRebuilt(line) {
  console.log(line);
};

const FuelScoop = async function FuelScoop(line) {
  Cmdr.ship.fuel.level = line.Total
  Cmdr.Save()
};

const Friends = async function Friends(line) {
  // TODO: Log Entries
  return;
};
const JetConeBoost = async function JetConeBoost(line) {
  console.log(line);
};
const JetConeDamage = async function JetConeDamage(line) {
  console.log(line);
};
const JoinACrew = async function JoinACrew(line) {
  return;
};
const KickCrewMember = async function KickCrewMember(line) {
  return;
};
const LaunchDrone = async function LaunchDrone(line) {
  return;
};
const LaunchFighter = async function LaunchFighter(line) {
  console.log(line);
};
const LaunchSRV = async function LaunchSRV(line) {
  Cmdr.inSrv = true;
  Cmdr.Save()

  let result = { callback: updateTravelState, data: line.event}
  return Promise.resolve(result)
};
const ModuleInfo = async function ModuleInfo(line) {
  /**
   * This also writes a ModulesInfo.json file alongside the journal,
   * listing the modules in the same order as displayed
   */
  return;
};
const Music = async function Music(line) {
  return;
};
const NpcCrewPaidWage = async function NpcCrewPaidWage(line) {
  console.log(line);
};
const NpcCrewRank = async function NpcCrewRank(line) {
  console.log(line);
};
const Promotion = async function Promotion(line) {
  for (rank in journal.RANKS) {
    if (line.hasOwnProperty(rank)) {
      db.ranks.update({ type: rank }, { level: line[rank], progress: 0 })
    }
  }
  let result = {
    callback: updateRank,
    data: { type: rank, level: line[rank] },
  };
  return Promise.resolve(result)
};
const ProspectedAsteroid = async function ProspectedAsteroid(line) {
  return;
};
const QuitACrew = async function QuitACrew(line) {
  return;
};
const RebootRepair = async function RebootRepair(line) {
  console.log(line);
};
const ReceiveText = async function ReceiveText(line) {
  return;
};
const RepairDrone = async function RepairDrone(line) {
  console.log(line);
};
const ReservoirReplenished = async function ReservoirReplenished(line) {
  return;
};
const Resurrect = async function Resurrect(line) {
  Cmdr.credits -= line.Cost
  Cmdr.Save()
};
const Scanned = async function Scanned(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event, type: line.ScanType },
  };
  return Promise.resolve(result)
};
const SelfDestruct = async function SelfDestruct(line) {
  console.log(line);
};
const SendText = async function SendText(line) {
  return;
};

const Shutdown = async function Shutdown(line) {
  Cmdr.Save()
  // await db.logs.update(fileName, {shutdown: true})
  lineNumber = 0
  
  let result = { callback: updateGameState, data: {event: line.event}};
  return Promise.resolve(result);

};

const Synthesis = async function Synthesis(line) {
  // TODO: decrease material count
  return;
};
const SystemsShutdown = async function SystemsShutdown(line) {
  return;
};
const USSDrop = async function USSDrop(line) {
  let result = {
    callback: updateToast,
    data: {
      event: line.event,
      type: line.USSType_Localised,
      threat: line.USSThreat,
    },
  };
  return Promise.resolve(result)
};
const VehicleSwitch = async function VehicleSwitch(line) {
  console.log(line);
};
const WingAdd = async function WingAdd(line) {
  // log Messages, but nothing else interesting
  return;
};
const WingInvite = async function WingInvite(line) {
  // log Messages, but nothing else interesting
  return;
};
const WingJoin = async function WingJoin(line) {
  // log Messages, but nothing else interesting
  return;
};
const WingLeave = async function WingLeave(line) {
  // log Messages, but nothing else interesting
  return;
};

module.exports = {
  ApproachSettlement,
  ChangeCrewRole,
  CrewMemberJoins,
  CrewMemberQuits,
  CommitCrime,
  DatalinkScan,
  DatalinkVoucher,
  DataScanned,
  DockSRV,
  EndCrewSession,
  Friends,
  FuelScoop,
  JoinACrew,
  KickCrewMember,
  LaunchDrone,
  LaunchSRV,
  ModuleInfo,
  Music,
  Promotion,
  ProspectedAsteroid,
  QuitACrew,
  ReceiveText,
  ReservoirReplenished,
  Resurrect,
  Scanned,
  SendText,
  Shutdown,
  Synthesis,
  SystemsShutdown,
  USSDrop,
  WingAdd,
  WingInvite,
  WingJoin,
  WingLeave
};
