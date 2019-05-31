const AchievementSchema = require('./achievement/achievement.schema')
const { ActivitySchema, DragAndDropActivitySchema, LinksActivitySchema, MemoryActivitySchema, TestActivitySchema } = require('./activity/activity.schema')
const CenterBackendSchema = require('./center/center.schema')
const ClassroomSchema = require('./classroom/classroom.schema')
const FaqSchema = require('./faq/faq.schema')
const GroupSchema = require('./group/group.schema')
const LabSchema = require('./lab/lab.schema')
const LevelSchema = require('./level/level.schema')
const LicenseBackendSchema = require('./license/license.schema')
const LogbookSchema = require('./logbook/logbook.schema')
const { CodeHtmlSchema, CodesHtmlSchema } = require('./module/code.schema')
const { ActivityModuleSchema, ContextSchema, ExperimentSchema, HtmlSchema, InfographicsSchema, ModuleSchema, SequentialModuleSchema,
  StatementSchema, StaticModuleSchema, StepsSchema, UploadSchema} = require('./module/module.schema')
const { ActivityProgressSchema, BaseProgressSchema, ItemProgressSchema, SessionProgressSchema, EvaluationProgressSchema,
  RubricProgressSchema} = require('./progress/progress.schema')
const { EvaluationFormSchema, ProjectSchema, RubricSchema } = require('./project/project.schema')
const SessionSchema = require('./session/session.schema')
const SlideSchema = require('./slide/slide.schema')
const AutorizationTokenSchema = require('./tokens/authorization/token.schema')
const EmailTokenSchema = require('./tokens/email/token.schema')
const TokenSchema = require('./tokens/recovery/token.schema')
const SessionTokenSchema = require('./tokens/session/token.schema')
const UserSchema = require('./user/user.schema')
const { DownloadSectionSchema, HrSectionSchema, ListSectionSchema, MediaSectionSchema, SectionArraySchema, SectionSchema,
  TextSectionSchema, WikiSchema } = require('./wiki/wiki.schema')

module.exports = {
  AchievementSchema: AchievementSchema,
  ActivitySchema: ActivitySchema,
  DragAndDropActivitySchema: DragAndDropActivitySchema,
  LinksActivitySchema: LinksActivitySchema,
  MemoryActivitySchema: MemoryActivitySchema,
  TestActivitySchema: TestActivitySchema,
  CenterBackendSchema: CenterBackendSchema,
  ClassroomSchema: ClassroomSchema,
  FaqSchema: FaqSchema,
  GroupSchema: GroupSchema,
  LabSchema: LabSchema,
  LevelSchema: LevelSchema,
  LicenseBackendSchema: LicenseBackendSchema,
  LogbookSchema: LogbookSchema,
  CodeHtmlSchema: CodeHtmlSchema,
  CodesHtmlSchema: CodesHtmlSchema,
  ActivityModuleSchema: ActivityModuleSchema,
  ContextSchema: ContextSchema,
  ExperimentSchema: ExperimentSchema,
  HtmlSchema: HtmlSchema,
  InfographicsSchema: InfographicsSchema,
  ModuleSchema: ModuleSchema,
  SequentialModuleSchema: SequentialModuleSchema,
  StatementSchema: StatementSchema,
  StaticModuleSchema: StaticModuleSchema,
  StepsSchema: StepsSchema,
  UploadSchema: UploadSchema,
  ActivityProgressSchema: ActivityProgressSchema,
  BaseProgressSchema: BaseProgressSchema,
  ItemProgressSchema: ItemProgressSchema,
  SessionProgressSchema: SessionProgressSchema,
  EvaluationProgressSchema: EvaluationProgressSchema,
  RubricProgressSchema: RubricProgressSchema,
  EvaluationFormSchema: EvaluationFormSchema,
  ProjectSchema: ProjectSchema,
  RubricSchema: RubricSchema,
  SessionSchema: SessionSchema,
  SlideSchema: SlideSchema,
  AutorizationTokenSchema: AutorizationTokenSchema,
  EmailTokenSchema: EmailTokenSchema,
  TokenSchema: TokenSchema,
  SessionTokenSchema: SessionTokenSchema,
  UserSchema: UserSchema,
  DownloadSectionSchema: DownloadSectionSchema,
  HrSectionSchema: HrSectionSchema,
  ListSectionSchema: ListSectionSchema,
  MediaSectionSchema: MediaSectionSchema,
  SectionArraySchema: SectionArraySchema,
  SectionSchema: SectionSchema,
  TextSectionSchema: TextSectionSchema,
  WikiSchema: WikiSchema
}
