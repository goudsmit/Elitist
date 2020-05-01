// ./js/lib/events.other.js
const journal = require("../journal");

// Api manual chapter 11: Other Events
const AfmuRepairs = function AfmuRepairs(line) {
  console.log(line);
};
const ApproachSettlement = function ApproachSettlement(line) {
  return;
};
const ChangeCrewRole = function ChangeCrewRole(line) {
  return;
};
const CockpitBreached = function CockpitBreached(line) {
  console.log(line);
};
const CommitCrime = function CommitCrime(line) {
  return;
};
const Continued = function Continued(line) {
  console.log(line);
};
const CrewLaunchFighter = function CrewLaunchFighter(line) {
  console.log(line);
};
const CrewMemberJoins = function CrewMemberJoins(line) {
  return;
};
const CrewMemberQuits = function CrewMemberQuits(line) {
  return;
};
const CrewMemberRoleChange = function CrewMemberRoleChange(line) {
  console.log(line);
};
const CrimeVictim = function CrimeVictim(line) {
  console.log(line);
};
const DatalinkScan = function DatalinkScan(line) {
  return;
};
const DatalinkVoucher = function DatalinkVoucher(line) {
  Cmdr.credits += line.Reward
  // Cmdr.Save()
};
const DataScanned = function DataScanned(line) {
  // Toast: candidate
  return;
};
const DockFighter = function DockFighter(line) {
  console.log(line);
};
const DockSRV = function DockSRV(line) {
  Cmdr.inSrv = false;
  
  let result = { callback: updateTravelState, data: line.event}
  return Promise.resolve(result)
};
const EndCrewSession = function EndCrewSession(line) {
  return;
};
const FighterRebuilt = function FighterRebuilt(line) {
  console.log(line);
};

const FuelScoop = function FuelScoop(line) {
  // TODO: There is an order issue in Cmdr.ship.fuel 
  // that makes it appear like it is not in the object
  if (Cmdr.ship.fuel != undefined) {
    Cmdr.ship.fuel.level = line.Total
  }
};

const Friends = function Friends(line) {
  // TODO: Log Entries
  return;
};
const JetConeBoost = function JetConeBoost(line) {
  console.log(line);
};
const JetConeDamage = function JetConeDamage(line) {
  console.log(line);
};
const JoinACrew = function JoinACrew(line) {
  return;
};
const KickCrewMember = function KickCrewMember(line) {
  return;
};
const LaunchDrone = function LaunchDrone(line) {
  return;
};
const LaunchFighter = function LaunchFighter(line) {
  console.log(line);
};
const LaunchSRV = function LaunchSRV(line) {
  Cmdr.inSrv = true;

  let result = { callback: updateTravelState, data: line.event}
  return Promise.resolve(result)
};
const ModuleInfo = function ModuleInfo(line) {
  /**
   * This also writes a ModulesInfo.json file alongside the journal,
   * listing the modules in the same order as displayed
   */
  return;
};
const Music = function Music(line) {
  return;
};
const NpcCrewPaidWage = function NpcCrewPaidWage(line) {
  console.log(line);
};
const NpcCrewRank = function NpcCrewRank(line) {
  console.log(line);
};
const Promotion = function Promotion(line) {
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
const ProspectedAsteroid = function ProspectedAsteroid(line) {
  return;
};
const QuitACrew = function QuitACrew(line) {
  return;
};
const RebootRepair = function RebootRepair(line) {
  console.log(line);
};
const ReceiveText = function ReceiveText(line) {
  return;
};
const RepairDrone = function RepairDrone(line) {
  console.log(line);
};
const ReservoirReplenished = function ReservoirReplenished(line) {
  return;
};
const Resurrect = function Resurrect(line) {
  Cmdr.credits -= line.Cost
};
const Scanned = function Scanned(line) {
  let result = {
    callback: updateAlertState,
    data: { event: line.event, type: line.ScanType },
  };
  return Promise.resolve(result)
};
const SelfDestruct = function SelfDestruct(line) {
  console.log(line);
};
const SendText = function SendText(line) {
  return;
};

const Shutdown = function Shutdown(line) {
  Cmdr.Save()
  // db.logs.update(fileName, {shutdown: true})
  lineNumber = 0
  
  let result = { callback: updateGameState, data: {event: line.event}};
  return Promise.resolve(result);

};

const Synthesis = function Synthesis(line) {
  // TODO: decrease material count
  return;
};
const SystemsShutdown = function SystemsShutdown(line) {
  return;
};
const USSDrop = function USSDrop(line) {
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
const VehicleSwitch = function VehicleSwitch(line) {
  console.log(line);
};
const WingAdd = function WingAdd(line) {
  // log Messages, but nothing else interesting
  return;
};
const WingInvite = function WingInvite(line) {
  // log Messages, but nothing else interesting
  return;
};
const WingJoin = function WingJoin(line) {
  // log Messages, but nothing else interesting
  return;
};
const WingLeave = function WingLeave(line) {
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
