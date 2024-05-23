var WSB;(function(n){const h=2,c=5,i=200,e=864e5,l="/msrewards/api/v1/getuserinfo",a="/msrewards/api/v1/codexeligible",v="https://account.microsoft.com/rewards?ref=WSB",y=n=>{return"https://account.microsoft.com/rewards/createuser?publ=CORTIP&crea=MY019H&pn=MULTIWSBACQ201910&returnUrl=%2Frewards%2Fredirect%3Flink%3D%252Frewards%26id%3Dbingtrial_250%26channel%3Dwsb%26type%3D16%26amount%3D"+n+"%26hash%3Db3bc83aeabe24a90fade4e7e81e00d5fda4aeb66abe9f569a27c5a97a75e8f57"},o="RewardsBadgeNotificationLastShownDate",u="RewardsBadgeNotificationTimesShown",p="&cvid=";class w{constructor(i){this._accessTokenManager=i;this._balance=new s;this._rewardsBadgeUpdatedHandlers=[];this._retryAttempted=0;r.init();t.init();const u=()=>{this._currentConversationId||(this._currentConversationId=n.Host.getConversationId(),this.isFeatureEnabled()&&this._msaAccount&&!n.Host.isAccountNotConsented(this._msaAccount)&&this.refreshBalance())};n.Host.bindConversationStart(()=>u());n.Host.bindQueryChangedOrInitialized(()=>u());n.Host.bindDismissed(()=>{this.clear(),this._msaAccount=null,this._currentConversationId=null,t.onDismiss(),this.shouldShowRewardsFlyout()&&n.RewardsFlyoutViewModel&&n.RewardsFlyoutViewModel.hideRewardsFlyout()});i.bindSelectedAccountChanged(t=>{if(this.isFeatureEnabled()&&!n.Host.isAccountNotConsented(t)){let n=t&&t.accountProviderAuthority=="consumers"?t:null;this.handleNewAccountAvailable(n)}});i.bindAccountTypesChanged(()=>{if(this.isFeatureEnabled()){let t=i.getCachedAccountInfo(0);this.handleNewAccountAvailable(t,(n.Host===null||n.Host===void 0?void 0:n.Host.isAuthInvestigation())?["MSFTRewardsViewsModel::handleAccountTypeChanged"]:undefined)}});i.bindAccessTokenAvailable((n,t)=>{if(n==0&&this.isFeatureEnabled())if(this._msaAccount)this.refreshBalance();else{let n=i.getCachedAccountInfo(0);this.handleNewAccountAvailable(n)}})}shouldShowBadgeNotification(){if(!this.shouldShowRewardsFlyout()||!n.config.rewardsFlyoutNotification||!this._userIsRewardsMember&&!n.config.rewardsFlyoutNotifNonMember)return!1;const t=Number(n.LightweightStorage.getItem(o))||0;if(this._userIsRewardsMember)return t==0||t+e<=n.getCurrentTime();const i=parseInt(n.LightweightStorage.getItem(u))||0,r=i<3,f=t==0||t+e*7<=n.getCurrentTime();return f&&r}onBadgeNotificationShown(){const t=parseInt(n.LightweightStorage.getItem(u))||0;n.LightweightStorage.setItem(o,n.getCurrentTime().toString());n.LightweightStorage.setItem(u,(t+1).toString());this.fireRewardsBadgeUpdated()}isFeatureEnabled(){return n.config.isRewardsEnabled?!0:n.contains(n.config.rewardsLanguageEnabled||[],n.uiLanguageCache.toLowerCase())}isCounterFactualLoggingEnabled(){return n.contains(n.config.rewardsCounterFactualLoggingLanguageEnabled||[],n.uiLanguageCache.toLowerCase())}handleNewAccountAvailable(n,t){t=t&&[...t,"MSFTRewardsViewsModel::handleNewAccountAvailable"];const i=this._msaAccount;i!=n&&this._currentConversationId&&(this._msaAccount=n,this._msaAccount?i&&this._msaAccount.accountId==i.accountId||(this.clearCurrentBadge(),this.refreshBalance(null,t)):this.clearCurrentBadge())}clearCurrentBadge(){let n=this._balance.isSet();this.clear();n&&this.fireRewardsBadgeUpdated()}clear(){this._rewardsEnabled=!1;this._userIsRewardsMember=!0;this._userIsGiving=!1;this._fetchInProgress=!1;this._balance=new s;this._retryAttempted=0}updateUserCodexStatus(t){const i=!!t;if(n.Host.getIsCodexUser()!=i&&n.Host.setIsCodexUser(i),this._msaAccount){const t=`CodexStatus${this._msaAccount.accountId}`,r=n.LightweightStorage.getItem(t);if(r){const u=JSON.parse(r);u!=i&&n.LightweightStorage.setItem(t,JSON.stringify(i))}else n.LightweightStorage.setItem(t,JSON.stringify(i))}}refreshBalance(t,i){if(i=i&&[...i,"MSFTRewardsViewsModel::refreshBalance"],!this._fetchInProgress&&(!this._currentConversationId||this._userIsRewardsMember)){const o=this._currentConversationId,u=()=>o==this._currentConversationId,e=t=>{f.getBalanceAsyncRpsToken(t,t=>{if(n.config===null||n.config===void 0?void 0:n.config.enableAgeCheckCodex)try{this.updateUserCodexStatus(t===null||t===void 0?void 0:t.IsCodexUser)}catch(i){SharedLogHelper.LogError("UpdateUserCodexStatusFromRewardsAPI",`failed to update: ${i}`)}this._fetchInProgress=!1;u()&&(t.IsRewardsUser||n.config.rewardsAnidAccrualEnabled)&&(this._rewardsEnabled=!0,this._userIsRewardsMember=t.IsRewardsUser,t.IsRewardsUser?(this._userIsGiving=t.IsGiveUser,this.setNewBalance(t.Balance)):(this._userIsGiving=!1,this.setNewBalance(r.getBalance(this._msaAccount))))},n=>{this._fetchInProgress=!1,u()&&this.handleError(t,n)})};if(this._fetchInProgress=!0,t)e(t);else{const t=n.getBingResourceOrScope(0);this._accessTokenManager.getAccount(0,t,!1,!0,r=>{let u=r&&r.Token;u?e(u):((n.config===null||n.config===void 0?void 0:n.config.enableAgeCheckCodex)&&t=="service::cortana.bing.com::mbi_ssl"&&n.Host.getIsCodexUser()&&n.Host.setIsCodexUser(!1),n.logAuthRelatedInfo("getAccountOnFailure",`authenticate failed for MSA account.
CallStack: ${i===null||i===void 0?void 0:i.join(" -> ")}`),this._fetchInProgress=!1)},undefined,i)}}}handleError(n,t){t&&t.Retryable&&this._retryAttempted<h&&(++this._retryAttempted,this.refreshBalance(n))}shouldShowRewardsFlyout(){const t=n.RuntimeConfig.QfMode===0||n.RuntimeConfig.QfMode===4||n.RuntimeConfig.QfMode===11;return n.config.rewFly&&!t&&n.RewardsFlyoutViewModel.EnabledMarketAndRegion()&&(n.config.nonMemberRewFly||this._userIsRewardsMember)}hide(){n.RewardsFlyoutViewModel.hideRewardsFlyout()}getDataModel(){if(!this._balance.isSet())return null;let r=this._balance.getValue(),u=this._userIsRewardsMember?this._userIsGiving?"RWBG":"RWBD":"RWBN",f;f=this.shouldShowRewardsFlyout()?()=>{this._flyout&&this._flyout.dismiss(),n.RewardsFlyoutViewModel.toggleRewardsFlyout(()=>t.instrumentFlyoutClick(),(n,i)=>t.instrumentClickOnBadge(u,n,i)),this.shouldShowBadgeNotification()&&this.onBadgeNotificationShown()}:(i,f)=>{n.config.rewFly&&!n.RewardsFlyoutViewModel.EnabledMarketAndRegion()&&t.instrumentRewardsFlyoutMarketBlock();t.instrumentClickOnBadge(u,i,f);let e=this._userIsRewardsMember?v:y(r);e=this.enrichUrlWithCvid(e);n.Host.launchUriAsync(e)};let o=""+r,s=this._userIsRewardsMember?1:r/i,e=t.instrumentBadge(u);return e.setProperty("Balance",o),{counterFactualLoggingEnabled:this.isCounterFactualLoggingEnabled(),balance:r,userIsRewardsMember:this._userIsRewardsMember,userIsGiving:this._userIsGiving,click:f,instItem:e,badgeFillupPercentage:s,showNotification:this.shouldShowBadgeNotification()}}enrichUrlWithCvid(t){return t+(p+n.encodeQueryParameter(n.Host.getConversationId()))}fireRewardsBadgeUpdated(){this._rewardsBadgeUpdatedHandlers.forEach(n=>n())}isRewardsEnabled(){return this.isCounterFactualLoggingEnabled()?!1:this._rewardsEnabled}notifyPointsRewarded(n){const t="notifyPointsRewarded";if(!this.isRewardsEnabled()){SharedLogHelper.LogError(t,null,new Error("Rewards not enabled"));return}if(!this._userIsRewardsMember)if(n<=0)n=this._balance.getValue()+c;else{SharedLogHelper.LogError(t,""+n,new Error("Invalid non rewards member new balance"));return}if(n<0){SharedLogHelper.LogError(t,""+n,new Error("Invalid rewards new balance"));return}this.setNewBalance(n)}setNewBalance(n){this._userIsRewardsMember||(n>i&&(n=i),r.setNewBalance(this._msaAccount,n));this._balance.getValue()!=n&&(this._balance.setValue(n),this.fireRewardsBadgeUpdated())}bindRewardsBadgeUpdated(n,t){this._rewardsBadgeUpdatedHandlers.push(n);t&&this._balance.isSet()&&n()}}n.MicrosoftRewardsViewModel=w;class s{getValue(){return this._value}setValue(n){this._value=typeof n=="number"?n:undefined}isSet(){return typeof this._value=="number"}}let f;(function(t){function i(t,i,u,f){var e,o,s,h,c;if(i)if(i.RewardsUser){let t=i.Balance&&i.Balance.Available;if(typeof t=="number"){const f=i.UserProfileAttributes&&i.UserProfileAttributes.give_user&&i.UserProfileAttributes.give_user.toLowerCase()=="true";let r=!1;if((n.config===null||n.config===void 0?void 0:n.config.enableAgeCheckCodex)&&((e=i.UserProfileAttributes)===null||e===void 0?void 0:e.waitlistattributes)){const n=JSON.parse(i.UserProfileAttributes.waitlistattributes);r=((s=(o=n===null||n===void 0?void 0:n.propertyBag)===null||o===void 0?void 0:o.IsBlocked)===null||s===void 0?void 0:s.toLowerCase())!=="true"&&((c=(h=n===null||n===void 0?void 0:n.propertyBag)===null||h===void 0?void 0:h.IsAdultMSA)===null||c===void 0?void 0:c.toLowerCase())==="true"}u({IsRewardsUser:!0,Balance:t,IsGiveUser:f,IsCodexUser:r})}else f(i.ErrorDetail)}else if(i.ErrorDetail&&i.ErrorDetail.ErrorCode===5003)if(n.config.enableCodexEligibleJudgment){t||u({IsRewardsUser:!1});let i={};i["X-Search-RPSToken"]=t;i["X-Rewards-Country"]=n.Host.getRegion();let e=JSON.stringify({PartnerId:"WindowsSearchBox"});n.fetchUrlJson(a,i,e,n=>r(n,u,f))}else u({IsRewardsUser:!1});else f(i.ErrorDetail);else f(null)}function r(n,t,i){if(n)n.ErrorCode===0?n.CodexEligible&&n.CodexEligible.toLowerCase()==="true"?t({IsRewardsUser:!1,IsCodexUser:!0}):t({IsRewardsUser:!1,IsCodexUser:!1}):(SharedLogHelper.LogWarning("ProcessGetCodexeligibleRequestResponse",n.ErrorMessage),i({ErrorCode:n.ErrorCode,Message:n.ErrorMessage,Retryable:!1}));else SharedLogHelper.LogWarning("ProcessGetCodexeligibleRequestResponse","No response from Codexeligible api."),i(null)}function u(t,r,u){let e={};e["X-Search-RPSToken"]=t;n.fetchUrlJson(l,e,f(),n=>i(t,n,r,u))}function f(n){let t={PartnerId:"WSB",Channel:"WSB"};return n&&(t.UserId=n),JSON.stringify(t)}t.getBalanceAsyncRpsToken=u})(f||(f={}));let r;(function(t){function f(){}function r(n){return"RewardsPoints_"+n.accountUserName}function u(t){let e=r(t),u=n.LightweightStorage.getItem(e),f=u?+u:0;return f>i?i:f}function e(t,f){if(f>i&&(f=i),u(t)!=f){let i=r(t);return f?n.LightweightStorage.setItem(i,""+f):n.LightweightStorage.removeItem(i),!0}return!1}t.init=f;t.getBalance=u;t.setNewBalance=e})(r||(r={}));let t;(function(t){function e(){}function o(){i=null;r=-1}function u(t){return i||(i=n.InstrumentedItem.getNonSuggestionInstrumentedItem(t,n.SyntheticQSCodesMaps.KValues,1)),i}function f(t){let i=n.SequenceNumberManager.getSequenceNumber(),f=u(t);return r<i&&(n.InstrumentationHelper.instrumentSyntheticInstrumentedItem(i,t,f),r=i),f}function s(t,i,e){let o=n.SequenceNumberManager.getSequenceNumber();r<o&&f(t);n.InstrumentationHelper.instrumentItemClick(i,u(t),o,null,e,null)}function h(){const t=n.SequenceNumberManager.getSequenceNumber();n.InstrumentationHelper.logClientInstEvent("Select","RewardsFlyoutOpen",t)}function c(){const t=n.SequenceNumberManager.getSequenceNumber(),i={revIp:n.revIpRegionCache,language:n.getCurrentLanguage()};n.InstrumentationHelper.logClientInstEvent("Select","RewardsFlyoutMarketBlock",t,i)}let i,r=-1;t.init=e;t.onDismiss=o;t.instrumentBadge=f;t.instrumentClickOnBadge=s;t.instrumentFlyoutClick=h;t.instrumentRewardsFlyoutMarketBlock=c})(t||(t={}))})(WSB||(WSB={}))