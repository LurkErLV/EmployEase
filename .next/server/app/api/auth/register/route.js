"use strict";(()=>{var e={};e.id=2,e.ids=[2],e.modules={53524:e=>{e.exports=require("@prisma/client")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6113:e=>{e.exports=require("crypto")},98327:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>g,originalPathname:()=>f,patchFetch:()=>k,requestAsyncStorage:()=>c,routeModule:()=>d,serverHooks:()=>h,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>w});var a={};r.r(a),r.d(a,{POST:()=>l});var s=r(95419),i=r(69108),o=r(99678),n=r(23106),u=r(6521),p=r(78070);async function l(e){let t=await e.json();if(!t||!t.email||!t.password)return p.Z.json({message:"Missing required parameter",ok:!1},{status:400});if(await n.Z.user.findFirst({where:{email:t.email}}).finally(()=>{n.Z.$disconnect()}))return p.Z.json({message:"Email already used",ok:!1},{status:422});let r=await n.Z.user.create({data:{email:t.email,password:await (0,u.hash)(t.password,10)}}).catch(e=>p.Z.json({message:"Server error",ok:!1},{status:500})).finally(()=>{n.Z.$disconnect()});return p.Z.json({message:r,ok:!0},{status:200})}let d=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/auth/register/route",pathname:"/api/auth/register",filename:"route",bundlePath:"app/api/auth/register/route"},resolvedPagePath:"/Users/lurker/Desktop/employease/app/api/auth/register/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:h,headerHooks:g,staticGenerationBailout:w}=d,f="/api/auth/register/route";function k(){return(0,o.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:m})}},23106:(e,t,r)=>{r.d(t,{Z:()=>a});let a=new(r(53524)).PrismaClient}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[431,521,206],()=>r(98327));module.exports=a})();